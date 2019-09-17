package com.dnastack.ddapfrontend.service;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.model.ViewAuthorization;
import dam.v1.DamService.GetFlatViewsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ViewsService {

    private DamClientFactory damClientFactory;

    @Autowired
    public ViewsService(DamClientFactory damClientFactory) {
        this.damClientFactory = damClientFactory;
    }

    public Mono<Map<String, Set<String>>> getRelevantViewsForUrlsInDam(String damId,
                                                              String realm,
                                                              Map<String, GetFlatViewsResponse.FlatView> flatViews,
                                                              List<String> uniqueUrls) {

        Map<String, Set<String>> views = new HashMap<>();
        uniqueUrls.forEach(url -> {
            Set<String> viewsForUrl = new HashSet<>();
            for (Map.Entry<String, GetFlatViewsResponse.FlatView> entry : flatViews.entrySet()) {
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
        return Mono.just(views);
    }

    public Flux<ViewAuthorization.ViewAuthorizationResponse> authorizeViews(List<String> uniqueViews,
                                                                                   String damToken,
                                                                                   String refreshToken,
                                                                                   String realm) {
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
                            .getAccessTokenForView(realm, resourceId, viewName, damToken, refreshToken)
                            .flatMap(locationAndToken ->
                                    Mono.just(new ViewAuthorization.ViewAuthorizationResponse(view, locationAndToken)))
                            .onErrorResume(throwable ->
                                    Mono.just(new ViewAuthorization.ViewAuthorizationResponse(view, throwable)));
                } else {
                    IllegalArgumentException exception = new IllegalArgumentException(String
                            .format("Provided view url '%s' "
                                    + "is not valid. "
                                    + "Please make sure the view url is formatted properly before proceeding", view));
                    return Mono.just(new ViewAuthorization.ViewAuthorizationResponse(view, exception));
                }
            } catch (Exception e) {
                return Mono.just(new ViewAuthorization.ViewAuthorizationResponse(view, e));
            }
        });
    }
}
