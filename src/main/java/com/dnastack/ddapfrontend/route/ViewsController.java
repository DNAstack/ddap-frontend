package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamAuthorizationException;
import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
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
    public Flux<ViewAuthorizationResponse> authorizeMultipleViews(@PathVariable String realm,
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

        Pattern viewPattern = Pattern.compile("/dam/(?<damId>[^/]+)/v1alpha/(?<realmId>[^/]+)/resources/"
            + "(?<resourceId>[^/]+)/views/(?<viewName>[^/]+)(/.*)*");

        return Flux.fromStream(uniqueViews.stream()).flatMap(view -> {
            try {
                Matcher matcher = viewPattern.matcher(view);
                if (matcher.find()) {
                    String damId = matcher.group("damId");
                    String resourceId = matcher.group("resourceId");
                    String viewName = matcher.group("viewName");

                    ReactiveDamClient reactiveDamClient = damClientFactory.getDamClient(damId);
                    return reactiveDamClient
                        .getAccessTokenForView(realm, resourceId, viewName, foundDamToken, refreshToken)
                        .flatMap(locationAndToken -> Mono.just(new ViewAuthorizationResponse(view, locationAndToken)))
                        .onErrorResume(throwable -> Mono.just(new ViewAuthorizationResponse(view, throwable)));
                } else {
                    IllegalArgumentException exception = new IllegalArgumentException(String
                        .format("Provided view url '%s' "
                            + "is not valid. "
                            + "Please make sure the view url is formatted properly before proceeding", view));
                    return Mono.just(new ViewAuthorizationResponse(view, exception));
                }
            } catch (Exception e) {
                return Mono.just(new ViewAuthorizationResponse(view, e));
            }
        });
    }

    @Data
    private static class ViewAuthorizationResponse {

        private final String view;
        private final GetTokenResponse locationAndToken;
        private final ViewAuthorizationException exception;

        ViewAuthorizationResponse(String view, GetTokenResponse locationAndToken) {
            this.view = view;
            this.locationAndToken = locationAndToken;
            this.exception = null;
        }

        ViewAuthorizationResponse(String view, Throwable exception) {
            this.view = view;
            this.exception = ViewAuthorizationException.from(exception);
            this.locationAndToken = null;
        }
    }

    @Data
    private static class ViewAuthorizationException {

        private final String message;
        private final String exceptionClass;
        private final int statusCode;

        ViewAuthorizationException(Throwable throwable) {
            this(500, throwable);
        }

        ViewAuthorizationException(int status, Throwable throwable) {
            this.message = throwable.getMessage();
            this.exceptionClass = throwable.getClass().getName();
            this.statusCode = status;
        }

        static ViewAuthorizationException from(Throwable throwable) {
            if (throwable instanceof WebClientResponseException) {
                return new ViewAuthorizationException(((WebClientResponseException) throwable).getRawStatusCode(),
                    throwable);
            } else {
                return new ViewAuthorizationException(throwable);
            }
        }

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

            return damClient.getFlattenedViews(realm, token, refreshToken).flatMap(flatViews ->
                Mono.just(getRelevantViewsForUrlsInDam(damId, realm, flatViews, uniqueUrls))
            );

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

    private Map<String, Set<String>> getRelevantViewsForUrlsInDam(String damId, String realm, Map<String,
        GetFlatViewsResponse.FlatView> flatViews,
        List<String> urls) {

        Map<String, Set<String>> views = new HashMap<>();
        urls.stream().forEach(url -> {
            Set<String> viewsForUrl = new HashSet<>();
            for (Entry<String, GetFlatViewsResponse.FlatView> entry : flatViews.entrySet()) {
                GetFlatViewsResponse.FlatView flatView = entry.getValue();
                String interfaceUri = flatView.getInterfaceUri();

                if (!interfaceUri.endsWith("/") && url.length() > interfaceUri.length()) {
                    interfaceUri = interfaceUri + "/";
                }

                if (url.startsWith(interfaceUri)) {
                    UriTemplate template = new UriTemplate("/dam/{damId}/v1alpha/{realmId}/resources/"
                        + "{resourceName}/views/{viewName}");

                    final Map<String, Object> variables = new HashMap<>();
                    variables.put("damId", damId);
                    variables.put("resourceName", flatView.getResourceName());
                    variables.put("viewName", flatView.getViewName());
                    variables.put("realmId", realm);
                    viewsForUrl.add(template.expand(variables).toString());
                }
            }
            views.put(url, viewsForUrl);
        });
        return views;
    }

}
