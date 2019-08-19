package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dataset.DatasetErrorException;
import com.dnastack.ddapfrontend.client.dataset.ReactiveDatasetClient;
import com.dnastack.ddapfrontend.client.dataset.model.DatasetResult;
import com.dnastack.ddapfrontend.model.FlatView;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dataset")
public class DatasetController {

    private final ReactiveDatasetClient datasetClient;
    private final DamClientFactory damClientFactory;
    private final UserTokenCookiePackager cookiePackager;

    @Autowired
    public DatasetController(DamClientFactory damClientFactory, UserTokenCookiePackager cookiePackager,
        ReactiveDatasetClient datasetClient) {
        this.datasetClient = datasetClient;
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
    }


    @GetMapping(params = "dataset_url")
    public Mono<DatasetResult> fetchDataset(@RequestParam("dataset_url") String datasetUrl,
        @RequestParam(value = "access_token", required = false) String accessToken) {
        return datasetClient.fetchSingleDataset(datasetUrl, accessToken).onErrorResume(e -> {
            if (!DatasetErrorException.class.isAssignableFrom(e.getClass())) {
                throw new DatasetErrorException(500, e.getMessage());
            } else {
                throw (DatasetErrorException) e;
            }
        });
    }

    @PostMapping(path = "/views")
    public Mono<Map<String, Set<String>>> fetchViews(@PathVariable String realm, @RequestBody List<String> urls,
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
        FlatView> flatViews,
        List<String> urls) {

        Map<String, Set<String>> views = new HashMap<>();
        urls.stream().forEach(url -> {
            Set<String> viewsForUrl = new HashSet<>();
            for (Map.Entry<String, FlatView> entry : flatViews.entrySet()) {
                FlatView flatView = entry.getValue();
                String interfaceUri = flatView.getInterfaceUri();

                if (!interfaceUri.endsWith("/") && url.length() > interfaceUri.length()) {
                    interfaceUri = interfaceUri + "/";
                }

                if (url.startsWith(interfaceUri)) {
                    UriTemplate template = new UriTemplate("/dam/{damId}/v1alpha/{realmId}/resources/"
                        + "{resourceName}/view/{viewName}");

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
