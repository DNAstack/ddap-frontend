package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.beacon.BeaconError;
import com.dnastack.ddapfrontend.beacon.BeaconInfo;
import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import com.dnastack.ddapfrontend.client.beacon.BeaconErrorException;
import com.dnastack.ddapfrontend.client.dam.FeignDamClient;
import com.dnastack.ddapfrontend.client.dam.model.DamResource;
import com.dnastack.ddapfrontend.client.dam.model.DamResources;
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
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Stream;

import static java.lang.String.format;


@Slf4j
@RestController
class BeaconResource {

    private final WebClient webClient = WebClient.builder()
            .filter(logRequest())
            .filter(logResponse())
            .build();

    private static ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            log.info(">>> {} {}", clientRequest.method(), clientRequest.url());
            clientRequest.headers()
                    .forEach((name, values) -> log.info("  {}: {}", name, values));
            return Mono.just(clientRequest);
        });
    }

    private static ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            log.info("<<< HTTP {}", clientResponse.rawStatusCode());
            clientResponse.headers().asHttpHeaders()
                    .forEach((name, values) -> log.info("  {}: {}", name, values));
            return Mono.just(clientResponse);
        });
    }

    private static final String BEACON_INTERFACE = "http:beacon";

    @Autowired
    private FeignDamClient feignDamClient;
    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @GetMapping(value = "/api/v1alpha/{realm}/resources/search", params = "type=beacon")
    public Flux<BeaconQueryResult> aggregateBeaconSearch(@PathVariable String realm,
                                                         BeaconRequestModel beaconRequest,
                                                         ServerHttpRequest request) {

        DamResources damResourcesResponse = feignDamClient.getResources(realm);
        Map<String, ResourceModel> resources = damResourcesResponse.getResources();
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);

        return maybePerformBeaconQueries(realm, beaconRequest, damToken, resources.entrySet());
    }

    @GetMapping(value = "/api/v1alpha/{realm}/resources/{resourceId}/search", params = "type=beacon")
    public Flux<BeaconQueryResult> singleResourceBeaconSearch(@PathVariable String realm,
                                                              @PathVariable String resourceId,
                                                              BeaconRequestModel beaconRequest,
                                                              ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        DamResource damResourceResponse = feignDamClient.getResource(realm, resourceId);
        Map.Entry<String, ResourceModel> resource = Map.entry(resourceId, damResourceResponse.getResource());

        return maybePerformBeaconQueries(realm, beaconRequest, damToken, Collections.singleton(resource));
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
    private Flux<BeaconQueryResult> maybePerformBeaconQueries(String realm, BeaconRequestModel beaconRequest, Optional<String> damToken, Collection<Map.Entry<String, ResourceModel>> resourceEntries) {
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
        final Mono<String> beaconViewToken = Mono.fromSupplier(() -> feignDamClient.getAccessTokenForView(damToken,
                                                                                                      realm,
                                                                                                      beaconView
                                                                                                              .getResourceId(),
                                                                                                      beaconView
                                                                                                              .getViewId())
                                                                               .getToken());

        return beaconViewToken.flatMap(viewToken -> {
            log.debug("About to query: {} beacon at {}", beaconView.getViewId(), beaconView.getUri());

            return doBeaconQuery(beaconRequest, beaconView.getUri(), viewToken)
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

    private Mono<com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult> doBeaconQuery(BeaconRequestModel beaconRequest, String beaconUrl, String token) {
        return webClient
                .get()
                .uri(beaconQueryUrl(beaconUrl + "/query", beaconRequest))
                .header("Authorization",
                        "Bearer " + token)
                .exchange()
                .flatMap(clientResponse -> {
                    if (clientResponse.statusCode().is2xxSuccessful()) {
                        return clientResponse.bodyToMono(com.dnastack.ddapfrontend.client.beacon.BeaconQueryResult.class)
                                             .flatMap(result -> {
                                                 if (result.getExists() == null) {
                                                     return Mono.error(Optional.ofNullable(result.getError())
                                                                               .map(error -> new BeaconErrorException(
                                                                                       error.getErrorCode(),
                                                                                       error.getMessage()))
                                                                               .orElseGet(() -> new BeaconErrorException(
                                                                                       null,
                                                                                       null)));
                                                 } else {
                                                     return Mono.just(result);
                                                 }
                                             });
                    } else {
                        return clientResponse.bodyToMono(String.class)
                                             .flatMap(body -> Mono.error(new BeaconErrorException(clientResponse.statusCode()
                                                                                                                .value(),
                                                                                                  body)));
                    }
                });
    }

    private String beaconQueryUrl(String baseUrl, BeaconRequestModel beaconRequest) {
        return format("%s" +
                        "?assemblyId=%s" +
                        "&referenceName=%s" +
                        "&start=%s" +
                        "&referenceBases=%s" +
                        "&alternateBases=%s",
                baseUrl,
                beaconRequest.getAssemblyId(),
                beaconRequest.getReferenceName(),
                beaconRequest.getStart(),
                beaconRequest.getReferenceBases(),
                beaconRequest.getAlternateBases());
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
