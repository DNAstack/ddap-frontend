package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dataset.DatasetErrorException;
import com.dnastack.ddapfrontend.client.dataset.ReactiveDatasetClient;
import com.dnastack.ddapfrontend.client.dataset.model.DatasetResult;
import com.dnastack.ddapfrontend.model.ViewAuthorization;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;

import java.util.*;
import com.dnastack.ddapfrontend.service.ViewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import dam.v1.DamService.GetFlatViewsResponse;
import dam.v1.DamService.GetTokenResponse;

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
                                            @RequestParam(value = "access_token", required = false) String accessToken,
                                            ServerHttpRequest request,
                                            @PathVariable String realm) {
        return getDatasetResult(datasetUrl, accessToken, request, realm);
    }

    private Mono<DatasetResult> getAccess(String datasetUrl, ServerHttpRequest request, String realm) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);
        String refreshToken = foundRefreshToken.orElse(null);
        String damToken = foundDamToken.orElse(null);
        return getViews(damToken, realm, refreshToken, datasetUrl).flatMap(viewsForUrl -> {
            if(!viewsForUrl.isEmpty()) {
                List<String> uniqueViews = new ArrayList<>(new HashSet<>(viewsForUrl));
                return ViewsService.authorizeViews(uniqueViews, damToken, refreshToken, realm)
                    .collectList()
                    .flatMap(tokens -> {
                        // assuming that there is only one token for a bucket
                        if (!tokens.isEmpty()) {
                            GetTokenResponse tokenResponse = tokens.get(0).getLocationAndToken();
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

    private Mono<DatasetResult> getDatasetResult(String datasetUrl, String token, ServerHttpRequest request, String realm) {
        return datasetClient.fetchSingleDataset(datasetUrl, token).onErrorResume(e -> {
            if (!DatasetErrorException.class.isAssignableFrom(e.getClass())) {
                throw new DatasetErrorException(500, e.getMessage());
            } else if(((DatasetErrorException) e).getStatus() == 403) {
                System.out.println("called");
                return getAccess(datasetUrl, request, realm);
            }else {
                throw (DatasetErrorException) e;
            }
        });
    }

    private Mono<Set<String>> getViews(String damToken,
                     String realm,
                     String refreshToken,
                     String datasetUrl){
        return Flux.fromStream(damClientFactory.allDamClients()).flatMap(clientEntry -> {
            String damId = clientEntry.getKey();
            ReactiveDamClient damClient = clientEntry.getValue();
            return damClient.getFlattenedViews(realm, damToken, refreshToken).flatMap(flatViews ->
                    ViewsService.getRelevantViewsForUrlsInDam(damId, realm, flatViews, List.of(datasetUrl))
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
