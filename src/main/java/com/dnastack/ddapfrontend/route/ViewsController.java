package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamAuthorizationException;
import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.model.ViewAuthorization;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.service.ViewsService;
import dam.v1.DamService.GetFlatViewsResponse;
import dam.v1.DamService.GetTokenResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1alpha/{realm}/views")
public class ViewsController {

    private final DamClientFactory damClientFactory;
    private final UserTokenCookiePackager cookiePackager;

    @Autowired
    public ViewsController(DamClientFactory damClientFactory, UserTokenCookiePackager cookiePackager) {
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
    }


    @PostMapping(path = "/tokens")
    public Flux<ViewAuthorization.ViewAuthorizationResponse> authorizeMultipleViews(@PathVariable String realm,
                                                                                    @RequestBody List<String> views, ServerHttpRequest request) {
        if (views == null || views.isEmpty()) {
            throw new IllegalArgumentException("Urls cannot be empty or null");
        }

        final List<String> uniqueViews = new ArrayList<>(new HashSet<>(views));
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager
            .extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);
        String refreshToken = foundRefreshToken.orElse(null);

        String foundDamToken = damToken
            .orElseThrow(() -> new DamAuthorizationException(401, "User has not authenticated with the DAM to perform"
                + " this action"));

        return ViewsService.authorizeViews(uniqueViews, foundDamToken, refreshToken, realm);
    }

    @PostMapping(path = "/lookup")
    public Mono<Map<String, Set<String>>> lookupViews(@PathVariable String realm, @RequestBody List<String> urls,
        ServerHttpRequest request) {

        if (urls == null || urls.isEmpty()) {
            throw new IllegalArgumentException("Urls cannot be empty or null");
        }

        final List<String> uniqueUrls = new ArrayList<>(new HashSet<>(urls));

        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager
            .extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);
        String refreshToken = foundRefreshToken.orElse(null);
        return Flux.fromStream(damClientFactory.allDamClients()).flatMap(clientEntry -> {
            String damId = clientEntry.getKey();
            ReactiveDamClient damClient = clientEntry.getValue();
            String token = damToken.get();
            // TODO: Handle error when token is empty
            return damClient.getFlattenedViews(realm, token, refreshToken).flatMap(flatViews ->
                    ViewsService.getRelevantViewsForUrlsInDam(damId, realm, flatViews, uniqueUrls));

        }).collectList().flatMap(viewsForAllDams -> {
            final Map<String, Set<String>> finalViewListing = new HashMap<>();

            for (Map<String, Set<String>> viewsForDam : viewsForAllDams) {
                for (Map.Entry<String, Set<String>> entry : viewsForDam.entrySet()) {
                    if (finalViewListing.containsKey(entry.getKey())) {
                        finalViewListing.get(entry.getKey()).addAll(entry.getValue());
                    } else {
                        finalViewListing.put(entry.getKey(), entry.getValue());
                    }
                }
            }
            return Mono.just(finalViewListing);
        });
    }

}
