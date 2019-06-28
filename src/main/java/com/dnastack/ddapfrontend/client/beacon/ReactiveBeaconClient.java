package com.dnastack.ddapfrontend.client.beacon;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Optional;

import static java.lang.String.format;

@Slf4j
@Component
public class ReactiveBeaconClient {

    private static final WebClient webClient = WebClient.builder()
            .filter(LoggingFilter.logRequest())
            .filter(LoggingFilter.logResponse())
            .build();

    public Mono<BeaconQueryResult> queryBeacon(BeaconRequestModel beaconRequest, String beaconUrl, String viewAccessToken) {
        return webClient.get()
                .uri(getBeaconQueryUrl(beaconUrl, beaconRequest))
                .header("Authorization", "Bearer " + viewAccessToken)
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

    private String getBeaconQueryUrl(String baseUrl, BeaconRequestModel beaconRequest) {
        return format("%s/query" +
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

}
