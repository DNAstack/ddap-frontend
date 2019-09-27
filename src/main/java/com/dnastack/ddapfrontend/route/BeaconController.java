package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.beacon.BeaconErrorException;
import com.dnastack.ddapfrontend.client.beacon.ReactiveBeaconClient;
import com.dnastack.ddapfrontend.client.beacon.model.BeaconInfo;
import com.dnastack.ddapfrontend.client.beacon.model.BeaconQueryError;
import com.dnastack.ddapfrontend.client.beacon.model.BeaconQueryResult;
import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.config.Dam;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import dam.v1.DamService.GetTokenResponse;
import dam.v1.DamService.Resource;
import dam.v1.DamService.View;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Stream;

import static com.dnastack.ddapfrontend.security.UserTokenCookiePackager.CookieKind;
import static java.lang.String.format;


@Slf4j
@RestController
@RequestMapping(value = "/api/v1alpha/{realm}/resources")
class BeaconController {

    private static final String BEACON_INTERFACE = "http:beacon";

    private ReactiveBeaconClient beaconClient;
    private DamClientFactory damClientFactory;
    private UserTokenCookiePackager cookiePackager;
    private Map<String, Dam> dams;

    @Autowired
    public BeaconController(ReactiveBeaconClient beaconClient,
                            DamClientFactory damClientFactory,
                            UserTokenCookiePackager cookiePackager,
                            @Qualifier("dams") Map<String, Dam> dams) {
        this.beaconClient = beaconClient;
        this.damClientFactory = damClientFactory;
        this.cookiePackager = cookiePackager;
        this.dams = dams;
    }

    @GetMapping(value = "/search", params = "type=beacon")
    public Flux<BeaconQueryResult> aggregateBeaconSearch(@PathVariable String realm,
                                                         BeaconRequestModel beaconRequest,
                                                         ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);
        String refreshToken = foundRefreshToken.orElse(null);

        return Flux.fromStream(damClientFactory.allDamClients())
            .flatMap(clientEntry -> {
                final String damId = clientEntry.getKey();
                final ReactiveDamClient damClient = clientEntry.getValue();
                return damClient.getResources(realm)
                    .flux()
                    .flatMap((damResources) -> {
                        Map<String, Resource> resources = damResources.getResourcesMap();
                        return maybePerformBeaconQueries(damClient,
                            damId,
                            realm,
                            beaconRequest,
                            damToken,
                            refreshToken,
                            resources.entrySet());
                    });
            });
    }

    @GetMapping(value = "{damId}/{resourceId}/search", params = "type=beacon")
    public Flux<BeaconQueryResult> singleResourceBeaconSearch(@PathVariable String realm,
                                                              @PathVariable String damId,
                                                              @PathVariable String resourceId,
                                                              BeaconRequestModel beaconRequest,
                                                              ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, CookieKind.DAM);
        Optional<String> refreshToken = cookiePackager.extractToken(request, CookieKind.REFRESH);

        final ReactiveDamClient damClient = damClientFactory.getDamClient(damId);

        return damClient.getResource(realm, resourceId)
            .flux()
            .flatMap((damResource) -> {
                Map.Entry<String, Resource> resource = Map.entry(resourceId, damResource);
                return maybePerformBeaconQueries(damClient,
                    damId,
                    realm,
                    beaconRequest,
                    damToken,
                    refreshToken.get(),
                    Collections.singleton(resource)
                );
            });
    }

    private static Stream<? extends BeaconView> filterBeaconView(String damId, Map.Entry<String, Resource> resource) {
        return resource.getValue()
            .getViewsMap()
            .entrySet()
            .stream()
            .flatMap(view -> {
                final List<String> uris = Optional.ofNullable(view.getValue()
                    .getComputedInterfacesMap()
                    .get(BEACON_INTERFACE))
                    .map(iface -> (List<String>) iface.getUriList())
                    .orElseGet(Collections::emptyList);
                return uris.stream()
                    .findFirst()
                    .stream()
                    .map(uri -> new BeaconView(
                        damId,
                        resource.getKey(),
                        resource.getValue(),
                        view.getKey(),
                        view.getValue(),
                        uri
                    ));
            });
    }

    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    private Flux<BeaconQueryResult> maybePerformBeaconQueries(ReactiveDamClient damClient,
                                                              String damId, String realm,
                                                              BeaconRequestModel beaconRequest,
                                                              Optional<String> damToken,
                                                              String refreshToken,
                                                              Collection<Map.Entry<String, Resource>> resourceEntries) {
        return resourceEntries
            .stream()
            .flatMap((Map.Entry<String, Resource> resources) -> filterBeaconView(damId, resources))
            .map(beaconView -> damToken.map(token -> maybePerformSingleBeaconViewQuery(
                damClient,
                realm,
                beaconView,
                beaconRequest,
                token,
                refreshToken))
                .orElseGet(() -> unauthorizedBeaconApiAlleleResponse(beaconView)))
            .map(Mono::flux)
            .reduce(Flux::merge)
            .orElse(Flux.empty());
    }

    private Mono<BeaconQueryResult> unauthorizedBeaconApiAlleleResponse(BeaconView beaconView) {
        final String message = format(
            "Unauthenticated: Cannot access view [%s/%s]",
            beaconView.getResourceId(),
            beaconView.getViewId());
        log.info(message);

        return Mono.just(createErrorBeaconResult(createBeaconInfo(beaconView), 401, message));
    }

    private Mono<BeaconQueryResult> maybePerformSingleBeaconViewQuery(ReactiveDamClient damClient,
        String realm,
        BeaconView beaconView,
        BeaconRequestModel beaconRequest,
        String damToken,
        String refreshToken) {

        final BeaconInfo beaconInfo = createBeaconInfo(beaconView);
        Mono<GetTokenResponse> tokenMono = damClient.getAccessTokenForView(realm, beaconView.getResourceId(),
            beaconView.getViewId(), damToken, refreshToken);

        return tokenMono.flatMap(viewToken -> {
            log.debug("About to query: {} beacon at {}", beaconView.getViewId(), beaconView.getUri());

            return beaconClient.queryBeacon(beaconRequest, beaconView.getUri(), viewToken.getToken())
                .map(result -> formatBeaconServerPayload(beaconInfo, result))
                .onErrorResume(BeaconErrorException.class, ex -> {
                    final BeaconQueryResult result = createErrorBeaconResult(beaconInfo,
                        ex.getStatus(),
                        ex.getMessage());
                    return Mono.just(result);
                })
                .onErrorResume(ex -> {
                    final BeaconQueryResult result = createErrorBeaconResult(beaconInfo,
                        500,
                        ex.getMessage());
                    return Mono.just(result);
                });
        }).onErrorResume(ex -> {
            final String message = format("Forbidden: Cannot access view [%s/%s]",
                beaconView.getResourceId(),
                beaconView.getViewId());
            log.info(message);

            return Mono.just(createErrorBeaconResult(beaconInfo, 403, message));
        });
    }

    private BeaconInfo createBeaconInfo(BeaconView beaconView) {
        final String viewLabel = getLabelFromUiMap(beaconView.getView().getUiMap());
        final String resourceLabel = getLabelFromUiMap(beaconView.getResource().getUiMap());

        return new BeaconInfo(
            StringUtils.isEmpty(viewLabel) ? beaconView.getViewId() : viewLabel,
            StringUtils.isEmpty(resourceLabel) ? beaconView.getResourceId() : resourceLabel,
            beaconView.getDamId(),
            beaconView.getResourceId(),
            beaconView.getViewId()
        );
    }

    private String getLabelFromUiMap(Map<String, String> uiMap) {
        if (uiMap == null) {
            return null;
        }
        return uiMap.get("label");
    }

    private BeaconQueryResult createErrorBeaconResult(BeaconInfo beaconInfo, int errorStatus, String errorMessage) {
        BeaconQueryResult fallback = new BeaconQueryResult();
        final BeaconQueryResult result = formatBeaconServerPayload(beaconInfo, fallback);
        result.setQueryError(new BeaconQueryError(errorStatus, errorMessage));
        return result;
    }


    private BeaconQueryResult formatBeaconServerPayload(BeaconInfo infoResponse,
        BeaconQueryResult queryResponse) {
        log.debug("Formatting {} {}", infoResponse, queryResponse);
        queryResponse.setBeaconInfo(infoResponse);

        return queryResponse;
    }

    @Value
    private static class BeaconView {

        String damId;
        String resourceId;
        Resource resource;
        String viewId;
        View view;
        String uri;
    }
}
