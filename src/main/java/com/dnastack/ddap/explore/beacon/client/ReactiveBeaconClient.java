package com.dnastack.ddap.explore.beacon.client;

import com.dnastack.ddap.common.client.LoggingFilter;
import com.dnastack.ddap.explore.beacon.client.model.BeaconQueryResult;
import com.dnastack.ddap.explore.beacon.model.BeaconRequestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
                .headers(h -> h.setBearerAuth(viewAccessToken))
                .exchange()
                .flatMap(clientResponse -> {
                    if (clientResponse.statusCode().is2xxSuccessful()) {
                        return clientResponse.bodyToMono(BeaconQueryResult.class)
                                .flatMap(result -> {
                                    if (result.getExists() == null) {
                                        return Mono.error(Optional.ofNullable(result.getError())
                                                .map(error -> new BeaconErrorException(
                                                        error.getErrorCode(),
                                                        error.getErrorMessage()))
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

    private URI getBeaconQueryUrl(String baseUrl, BeaconRequestModel beaconRequest) {
        try {
            final URI beaconBaseUrl = new URI(baseUrl);
            final UriTemplate template = new UriTemplate("/beacon/query" +
                    "?assemblyId={assemblyId}" +
                    "&referenceName={referenceName}" +
                    "&start={start}" +
                    "&referenceBases={referenceBases}" +
                    "&alternateBases={alternateBases}");
            final Map<String, Object> variables = new HashMap<>();
            variables.put("assemblyId", beaconRequest.getAssemblyId());
            variables.put("referenceName", beaconRequest.getReferenceName());
            variables.put("start", beaconRequest.getStart());
            variables.put("referenceBases", beaconRequest.getReferenceBases());
            variables.put("alternateBases", beaconRequest.getAlternateBases());

            return beaconBaseUrl.resolve(template.expand(variables));
        } catch (URISyntaxException e) {
            throw new BeaconErrorException(500, "Failed to construct beacon URL");
        }
    }

}
