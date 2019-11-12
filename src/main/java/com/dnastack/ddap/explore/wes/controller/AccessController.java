package com.dnastack.ddap.explore.wes.controller;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.explore.dam.client.ReactiveDamClient;
import com.dnastack.ddap.explore.wes.client.AccessErrorException;
import com.dnastack.ddap.explore.wes.service.ViewsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import dam.v1.DamService.GetTokenResponse;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;


@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/access")
public class AccessController {

    private final UserTokenCookiePackager cookiePackager;
    private Map<String, ReactiveDamClient> damClients;
    private final ViewsService viewsService;

    @Autowired
    public AccessController(UserTokenCookiePackager cookiePackager,
                            Map<String, ReactiveDamClient> damClients,
                            ViewsService viewsService) {
        this.cookiePackager = cookiePackager;
        this.damClients = damClients;
        this.viewsService = viewsService;
    }

    @GetMapping("/{bucketName}/{*filePath}")
    public Mono<Void> getAccessToken(@PathVariable String bucketName,
                                     @PathVariable String realm,
                                     @PathVariable String filePath,
                                     ServerHttpRequest request,
                                     ServerHttpResponse response) throws URISyntaxException {
        log.info("Bucket name: {} \n Realm Name: {}", bucketName, realm);
        String bucketUrl = "gs://" + bucketName;
        URI bucketUri = new URI("https://storage.cloud.google.com/" + bucketName + filePath);

        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request,
                Set.of(CookieKind.DAM, CookieKind.REFRESH));

        return getViews(realm, tokens, bucketUrl).flatMap(views -> {
            if (!views.isEmpty()) {
                return getAccessTokens(views, tokens, realm, bucketUri, response);
            } else {
                throw new AccessErrorException(500, "There are no views associated with the resource");
            }
        });
    }

    private Mono<Set<String>> getViews(String realm,
                                       Map<CookieKind, String> tokens,
                                       String bucketUrl) {
        return Flux.fromStream(damClients.entrySet().stream()).flatMap(clientEntry -> {
            String damId = clientEntry.getKey();
            ReactiveDamClient damClient = clientEntry.getValue();
            String damToken = tokens.get(CookieKind.DAM);
            String refreshToken = tokens.get(CookieKind.REFRESH);
            return damClient.getFlattenedViews(realm, damToken, refreshToken).flatMap(flatViews ->
                    viewsService.getRelevantViewsForUrlsInDam(damId, realm, flatViews, List.of(bucketUrl))
            );
        }).collectList().flatMap(viewsForAllDams -> {
            final Set<String> finalViews = new HashSet<>();
            for (Map<String, Set<String>> viewsForDam : viewsForAllDams) {
                for (Map.Entry<String, Set<String>> entry : viewsForDam.entrySet()) {
                    finalViews.addAll(entry.getValue());
                }
            }
            return Mono.just(finalViews);
        });
    }

    private Mono<Void> getAccessTokens(Set<String> resourceViews,
                                       Map<CookieKind, String> tokens,
                                       String realm,
                                       URI bucketUri,
                                       ServerHttpResponse response) {
        List<String> uniqueViews = new ArrayList<>(new HashSet<>(resourceViews));
        return viewsService.authorizeViews(uniqueViews, tokens, realm)
                .collectList()
                .flatMap(viewAuthorizationResponses -> {
                    if (!viewAuthorizationResponses.isEmpty()) {
                        GetTokenResponse tokenResponse = viewAuthorizationResponses.get(0).getLocationAndToken();
                        if (tokenResponse != null) {
                            String accessToken = tokenResponse.getToken();
                            log.info("Redirecting to {} with access token", bucketUri);
                            URI updatedBucketURI = UriComponentsBuilder.fromUri(bucketUri)
                                    .queryParam("access_token", accessToken)
                                    .build()
                                    .toUri();
                            response.setStatusCode(HttpStatus.PERMANENT_REDIRECT);
                            response.getHeaders().setLocation(updatedBucketURI);
                            return response.setComplete();
                        } else {
                            throw new AccessErrorException(403, "You are not allowed to access this resource");
                        }
                    } else {
                        throw new AccessErrorException(403, "You are not allowed to access this resource");
                    }
                });
    }
}
