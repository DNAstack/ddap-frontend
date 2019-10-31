package com.dnastack.ddap.explore.dataset.controller;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.explore.dam.client.ReactiveDamClient;
import com.dnastack.ddap.explore.dataset.client.DatasetErrorException;
import com.dnastack.ddap.explore.dataset.client.ReactiveDatasetClient;
import com.dnastack.ddap.explore.dataset.client.model.DatasetResult;
import com.dnastack.ddap.explore.wes.service.ViewsService;
import dam.v1.DamService.GetTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dataset")
public class DatasetController {

    private final ReactiveDatasetClient datasetClient;
    private Map<String, ReactiveDamClient> damClients;
    private final UserTokenCookiePackager cookiePackager;
    private final ViewsService viewsService;

    @Autowired
    public DatasetController(Map<String, ReactiveDamClient> damClients, UserTokenCookiePackager cookiePackager,
                             ReactiveDatasetClient datasetClient, ViewsService viewsService) {
        this.datasetClient = datasetClient;
        this.cookiePackager = cookiePackager;
        this.damClients = damClients;
        this.viewsService = viewsService;
    }


    @GetMapping(params = "dataset_url")
    public Mono<DatasetResult> fetchDataset(@RequestParam("dataset_url") String datasetUrl,
                                            @RequestParam(value = "access_token", required = false) String accessToken,
                                            ServerHttpRequest request,
                                            @PathVariable String realm) {
        String urlEncodedAsciiDatasetUrl = new String(Base64.getDecoder().decode(datasetUrl));
        String decodedDatasetUrl;
        try {
            decodedDatasetUrl = URLDecoder.decode(urlEncodedAsciiDatasetUrl, StandardCharsets.UTF_8.name());
        } catch (UnsupportedEncodingException e) {
            throw new DatasetErrorException(400, e.getMessage());
        }
        return getDatasetResult(decodedDatasetUrl, accessToken, request, realm);
    }

    private Mono<DatasetResult> getDatasetResult(String datasetUrl, String token, ServerHttpRequest request, String realm) {
        return datasetClient.fetchSingleDataset(datasetUrl, token).onErrorResume(e -> {
            if (!DatasetErrorException.class.isAssignableFrom(e.getClass())) {
                throw new DatasetErrorException(500, e.getMessage());
            } else if(((DatasetErrorException) e).getStatus() == 403) {
                return getAccess(datasetUrl, request, realm);
            }else {
                throw (DatasetErrorException) e;
            }
        });
    }

    private Mono<DatasetResult> getAccess(String datasetUrl, ServerHttpRequest request, String realm) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));
        return getViews(tokens.get(CookieKind.DAM), realm, tokens.get(CookieKind.REFRESH), datasetUrl).flatMap(viewsForUrl -> {
            if(!viewsForUrl.isEmpty()) {
                List<String> uniqueViews = new ArrayList<>(new HashSet<>(viewsForUrl));
                return viewsService.authorizeViews(uniqueViews, tokens, realm)
                    .collectList()
                    .flatMap(viewAuthorizationResponses -> {
                        // assuming that there is only one token for a bucket
                        if (!viewAuthorizationResponses.isEmpty()) {
                            GetTokenResponse tokenResponse = viewAuthorizationResponses.get(0).getLocationAndToken();
                            String accessToken = "";
                            if (tokenResponse != null) {
                                accessToken = tokenResponse.getToken();
                            }
                            return getDatasetResult(datasetUrl, accessToken, request, realm);
                        } else {
                            throw new DatasetErrorException(403, "You are not allowed to access this resource");
                        }
                });
            } else {
                throw new DatasetErrorException(500, "No views associated with the resource");
            }
        }
        );
    }

    private Mono<Set<String>> getViews(String damToken,
                     String realm,
                     String refreshToken,
                     String datasetUrl){
        return Flux.fromStream(damClients.entrySet().stream()).flatMap(clientEntry -> {
            String damId = clientEntry.getKey();
            ReactiveDamClient damClient = clientEntry.getValue();
            return damClient.getFlattenedViews(realm, damToken, refreshToken).flatMap(flatViews ->
                    viewsService.getRelevantViewsForUrlsInDam(damId, realm, flatViews, List.of(datasetUrl))
            );
        }).collectList().flatMap(viewsForAllDams -> {
            final Set<String> finalViews = new HashSet<>();
            for (Map<String, Set<String>> viewsForDam : viewsForAllDams) {
                for (Map.Entry<String, Set<String>> entry : viewsForDam.entrySet()){
                    finalViews.addAll(entry.getValue());
                }
            }
            return Mono.just(finalViews);
        });
    }
}
