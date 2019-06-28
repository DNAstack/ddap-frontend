package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.beacon.BeaconErrorException;
import com.dnastack.ddapfrontend.client.beacon.ReactiveBeaconClient;
import com.dnastack.ddapfrontend.client.beacon.model.*;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dam.model.DamResource;
import com.dnastack.ddapfrontend.client.dam.model.DamView;
import com.dnastack.ddapfrontend.client.dam.model.LocationAndToken;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import com.dnastack.ddapfrontend.model.InterfaceModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

import static java.lang.String.format;


@Slf4j
@RestController
@RequestMapping(value = "/api/v1alpha/{realm}/resources")
class BeaconController {

    private static final String BEACON_INTERFACE = "http:beacon";

    private ReactiveBeaconClient beaconClient;
    private ReactiveDamClient damClient;
    private UserTokenCookiePackager cookiePackager;

    @Autowired
    public BeaconController(ReactiveBeaconClient beaconClient,
                            ReactiveDamClient damClient,
                            UserTokenCookiePackager cookiePackager) {
        this.beaconClient = beaconClient;
        this.damClient = damClient;
        this.cookiePackager = cookiePackager;
    }

    @GetMapping(value = "/search", params = "type=beacon")
    public Flux<BeaconQueryResult> aggregateBeaconSearch(@PathVariable String realm,
                                                         BeaconRequestModel beaconRequest,
                                                         ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        return damClient.getResources(realm)
                .flux()
                .flatMap((damResources) -> {
                    Map<String, DamResource> resources = damResources.getResources();
                    return maybePerformBeaconQueries(realm, beaconRequest, damToken, resources.entrySet());
                });
    }

    @GetMapping(value = "/{resourceId}/search", params = "type=beacon")
    public Flux<BeaconQueryResult> singleResourceBeaconSearch(@PathVariable String realm,
                                                              @PathVariable String resourceId,
                                                              BeaconRequestModel beaconRequest,
                                                              ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        return damClient.getResource(realm, resourceId)
                .flux()
                .flatMap((damResource) -> {
                    Map.Entry<String, DamResource> resource = Map.entry(resourceId, damResource);
                    return maybePerformBeaconQueries(realm, beaconRequest, damToken, Collections.singleton(resource));
                });
    }

    private static Stream<? extends BeaconView> filterBeaconView(Map.Entry<String, DamResource> resource) {
        return resource.getValue()
                .getViews()
                .entrySet()
                .stream()
                .flatMap(view -> {
                    final List<String> uris = Optional.ofNullable(view.getValue()
                            .getInterfaces()
                            .get(BEACON_INTERFACE))
                            .map(InterfaceModel::getUri)
                            .orElseGet(Collections::emptyList);
                    return uris.stream()
                            .findFirst()
                            .stream()
                            .map(uri -> new BeaconView(resource.getKey(),
                                    resource.getValue(),
                                    view.getKey(),
                                    view.getValue(),
                                    uri));
                });
    }

    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    private Flux<BeaconQueryResult> maybePerformBeaconQueries(String realm,
                                                              BeaconRequestModel beaconRequest,
                                                              Optional<String> damToken,
                                                              Collection<Map.Entry<String, DamResource>> resourceEntries) {
        return resourceEntries
                .stream()
                .flatMap(BeaconController::filterBeaconView)
                .map(beaconView -> damToken.map(token -> maybePerformSingleBeaconViewQuery(realm,
                        beaconView,
                        beaconRequest,
                        token))
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

    private Mono<BeaconQueryResult> maybePerformSingleBeaconViewQuery(String realm,
                                                                      BeaconView beaconView,
                                                                      BeaconRequestModel beaconRequest,
                                                                      String damToken) {

        final BeaconInfo beaconInfo = createBeaconInfo(beaconView);
        Mono<LocationAndToken> tokenMono = damClient.getAccessTokenForView(realm, beaconView.getResourceId(), beaconView.getViewId(), damToken);

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
        final String viewLabel = beaconView.getView().getLabel();
        final String resourceLabel = beaconView.getResource().getLabel();

        return new BeaconInfo(StringUtils.isEmpty(viewLabel) ? beaconView.getViewId() : viewLabel,
                StringUtils.isEmpty(resourceLabel) ? beaconView.getResourceId() : resourceLabel,
                beaconView.getResourceId(),
                beaconView.getViewId());
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
        String resourceId;
        DamResource resource;
        String viewId;
        DamView view;
        String uri;
    }
}
