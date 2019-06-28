package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.beacon.BeaconError;
import com.dnastack.ddapfrontend.beacon.BeaconInfo;
import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import com.dnastack.ddapfrontend.client.beacon.BeaconErrorException;
import com.dnastack.ddapfrontend.client.beacon.ReactiveBeaconClient;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dam.model.LocationAndToken;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import com.dnastack.ddapfrontend.model.InterfaceModel;
import com.dnastack.ddapfrontend.model.ResourceModel;
import com.dnastack.ddapfrontend.model.ViewModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Stream;

import static java.lang.String.format;


@Slf4j
@RestController
class BeaconResource {

    private static final String BEACON_INTERFACE = "http:beacon";

    private ReactiveBeaconClient beaconClient;
    private ReactiveDamClient damClient;
    private UserTokenCookiePackager cookiePackager;

    @Autowired
    public BeaconResource(ReactiveBeaconClient beaconClient,
                          ReactiveDamClient damClient,
                          UserTokenCookiePackager cookiePackager) {
        this.beaconClient = beaconClient;
        this.damClient = damClient;
        this.cookiePackager = cookiePackager;
    }

    @GetMapping(value = "/api/v1alpha/{realm}/resources/search", params = "type=beacon")
    public Flux<BeaconQueryResult> aggregateBeaconSearch(@PathVariable String realm,
                                                         BeaconRequestModel beaconRequest,
                                                         ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        return damClient.getResources(realm)
                .flux()
                .flatMap((damResources) -> {
                    Map<String, ResourceModel> resources = damResources.getResources();
                    return maybePerformBeaconQueries(realm, beaconRequest, damToken, resources.entrySet());
                });
    }

    @GetMapping(value = "/api/v1alpha/{realm}/resources/{resourceId}/search", params = "type=beacon")
    public Flux<BeaconQueryResult> singleResourceBeaconSearch(@PathVariable String realm,
                                                              @PathVariable String resourceId,
                                                              BeaconRequestModel beaconRequest,
                                                              ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        return damClient.getResource(realm, resourceId)
                .flux()
                .flatMap((damResource) -> {
                    Map.Entry<String, ResourceModel> resource = Map.entry(resourceId, damResource.getResource());
                    return maybePerformBeaconQueries(realm, beaconRequest, damToken, Collections.singleton(resource));
                });
    }

    private static Stream<? extends BeaconView> filterBeaconView(Map.Entry<String, ResourceModel> resource) {
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
                                                              Collection<Map.Entry<String, ResourceModel>> resourceEntries) {
        return resourceEntries
                .stream()
                .flatMap(BeaconResource::filterBeaconView)
                .map(beaconView -> damToken.map(token -> maybePerformSingleBeaconViewQuery(realm,
                        beaconView,
                        beaconRequest,
                        token))
                        .orElseGet(() -> unauthorizedBeaconQueryResult(beaconView)))
                .map(Mono::flux)
                .reduce(Flux::merge)
                .orElse(Flux.empty());
    }

    private Mono<BeaconQueryResult> unauthorizedBeaconQueryResult(BeaconView beaconView) {
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
        com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult fallback = new com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult();
        final BeaconQueryResult result = formatBeaconServerPayload(beaconInfo, fallback);
        result.setError(new BeaconError(errorStatus, errorMessage));
        return result;
    }



    private BeaconQueryResult formatBeaconServerPayload(BeaconInfo infoResponse,
                                                        com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult queryResponse) {
        final BeaconQueryResult externalResult = new BeaconQueryResult();

        log.debug("Formatting {} {}", infoResponse, queryResponse);

        final Optional<com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult> oQueryResponse = Optional.ofNullable(queryResponse);

        final Boolean exists = oQueryResponse.map(com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult::getExists).orElse(null);

        externalResult.setExists(exists);
        externalResult.setBeaconInfo(infoResponse);

        // TODO populate from beacon payload
        Map<String, String> info = new HashMap<>();
        info.put("Allele origin", "Germline");
        info.put("Clinical significance", "Pathogenic");
        info.put("Clinical significance citations", "PMID:23108138");
        info.put("Collection method", "Curation");
        info.put("Condition category", "Disease");
        info.put("Gene symbol", "BRCA2");

        if (exists != null && exists) {
            externalResult.setInfo(info);
        }

        oQueryResponse.map(com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult::getAlleleRequest)
                .ifPresent(alleleRequest -> externalResult.getMetadata().put("alleleRequest", alleleRequest));
        oQueryResponse.map(com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult::getDatasetAlleleResponses)
                .ifPresent(datasetAlleleResponses -> externalResult.getMetadata().put("datasetAlleleResponses",
                        datasetAlleleResponses));

        return externalResult;
    }

    @Value
    private static class BeaconView {
        String resourceId;
        ResourceModel resource;
        String viewId;
        ViewModel view;
        String uri;
    }
}
