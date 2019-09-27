package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.model.ViewAuthorization;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.service.ViewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;

import static com.dnastack.ddapfrontend.security.UserTokenCookiePackager.CookieKind;

@RestController
@RequestMapping("/api/v1alpha/{realm}/views")
public class ViewsController {

    private final DamClientFactory damClientFactory;
    private final UserTokenCookiePackager cookiePackager;
    private final ViewsService viewsService;

    @Autowired
    public ViewsController(DamClientFactory damClientFactory,
                           UserTokenCookiePackager cookiePackager,
                           ViewsService viewsService) {
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
        this.viewsService = viewsService;
    }


    @PostMapping(path = "/tokens")
    public Flux<ViewAuthorization.ViewAuthorizationResponse> authorizeMultipleViews(@PathVariable String realm,
                                                                                    @RequestBody List<String> views,
                                                                                    ServerHttpRequest request) {
        if (views == null || views.isEmpty()) {
            throw new IllegalArgumentException("Urls cannot be empty or null");
        }

        final List<String> uniqueViews = new ArrayList<>(new HashSet<>(views));
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));

        return viewsService.authorizeViews(uniqueViews, tokens, realm);
    }

    @PostMapping(path = "/lookup")
    public Mono<Map<String, Set<String>>> lookupViews(@PathVariable String realm,
                                                      @RequestBody List<String> urls,
                                                      ServerHttpRequest request) {
        if (urls == null || urls.isEmpty()) {
            throw new IllegalArgumentException("Urls cannot be empty or null");
        }
        final List<String> uniqueUrls = new ArrayList<>(new HashSet<>(urls));

        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));
        return Flux.fromStream(damClientFactory.allDamClients()).flatMap(clientEntry -> {
            String damId = clientEntry.getKey();
            ReactiveDamClient damClient = clientEntry.getValue();
            // TODO: Handle error when token is empty
            return damClient.getFlattenedViews(realm, tokens.get(CookieKind.DAM), tokens.get(CookieKind.REFRESH))
                    .flatMap(flatViews -> viewsService.getRelevantViewsForUrlsInDam(damId, realm, flatViews, uniqueUrls));
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
