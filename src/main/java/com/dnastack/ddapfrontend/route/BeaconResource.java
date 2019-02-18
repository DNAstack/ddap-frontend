package com.dnastack.ddapfrontend.route;

import static java.lang.String.format;

import com.dnastack.ddapfrontend.beacon.BeaconInfo;
import com.dnastack.ddapfrontend.beacon.BeaconOrganization;
import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import com.dnastack.ddapfrontend.beacon.ExternalBeaconQueryResult;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
class BeaconResource {

    @GetMapping(value = "/api/resources/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQuery(BeaconRequestModel request) {
        return Flux.merge(
            handleBeaconQueryForResource(null, request),
            handleBeaconQueryForResource(null, request),
            handleBeaconQueryForResource(null, request),
            handleBeaconQueryForResource(null, request)
        );
    }

    @GetMapping(value = "/api/resources/{resourceId}/search", params = "type=beacon")
    public Mono<ExternalBeaconQueryResult> handleBeaconQueryForResource(@PathVariable String resourceId, BeaconRequestModel request) {
        final String queryTemplate = "https://beacon.cafevariome.org/query" +
                "?assemblyId=%s" +
                "&referenceName=%s" +
                "&start=%s" +
                "&referenceBases=%s" +
                "&alternateBases=%s";

        final Mono<BeaconQueryResult> beaconQueryResponse = WebClient.create()
                                                                     .get()
                                                                     .uri(format(
                                                                             queryTemplate,
                                                                         request.getAssemblyId(),
                                                                         request.getReferenceName(),
                                                                         request.getStart(),
                                                                         request.getReferenceBases(),
                                                                         request.getAlternateBases()))
                                                                     .exchange()
                                                                     .flatMap(clientResponse -> clientResponse.bodyToMono(
                                                                             BeaconQueryResult.class));
        final Mono<BeaconInfo> beaconInfoResponse = WebClient.create()
                                                             .get()
                                                             .uri("https://beacon.cafevariome.org/")
                                                             .exchange()
                                                             .flatMap(clientResponse -> clientResponse.bodyToMono(
                                                                     BeaconInfo.class));
        return Mono.zip(beaconInfoResponse, beaconQueryResponse, this::formatBeaconServerPayload);

    }

    private ExternalBeaconQueryResult formatBeaconServerPayload(BeaconInfo infoResponse, BeaconQueryResult queryResponse) {
        final ExternalBeaconQueryResult externalResult = new ExternalBeaconQueryResult();

        final String beaconName = Optional.ofNullable(infoResponse)
                                          .map(BeaconInfo::getName)
                                          .orElse("Unknown");
        final String organizationName = Optional.ofNullable(infoResponse)
                                                .map(BeaconInfo::getOrganization)
                                                .map(BeaconOrganization::getName)
                                                .orElse("Unknown");


        final Optional<BeaconQueryResult> oQueryResponse = Optional.ofNullable(queryResponse);

        externalResult.setName(beaconName);
        externalResult.setOrganization(organizationName);
        externalResult.setExists(oQueryResponse.map(BeaconQueryResult::getExists)
                                               .orElse(null));


        oQueryResponse.map(BeaconQueryResult::getAlleleRequest)
                      .ifPresent(alleleRequest -> externalResult.getMetadata().put("alleleRequest", alleleRequest));
        oQueryResponse.map(BeaconQueryResult::getDatasetAlleleResponses)
                      .ifPresent(datasetAlleleResponses -> externalResult.getMetadata().put("datasetAlleleResponses",
                                                                        datasetAlleleResponses));
        oQueryResponse.map(BeaconQueryResult::getError)
                      .ifPresent(error -> externalResult.getMetadata().put("error", error));

        return externalResult;
    }
}
