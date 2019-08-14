package com.dnastack.ddapfrontend.client.dataset;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import com.dnastack.ddapfrontend.client.dataset.model.DatasetResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class ReactiveDatasetClient {

    private static final WebClient webClient = WebClient.builder()
        .filter(LoggingFilter.logRequest())
        .filter(LoggingFilter.logResponse())
        .build();

    public Mono<DatasetResult> fetchSingleDataset(String datasetUrl, String viewAccessToken) {
        return webClient.get()
            .uri(datasetUrl)
            .headers(h -> {
                if (viewAccessToken != null) {
                    h.setBearerAuth(viewAccessToken);
                }
            })
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .flatMap(clientResponse -> {
                if (clientResponse.statusCode().is2xxSuccessful()) {
                    return clientResponse.bodyToMono(DatasetResult.class)
                        .flatMap(result -> {
                            if (result.getSchema() == null) {
                                return Mono.error(new DatasetErrorException(null, "Dataset schema is not defined"));
                            } else {
                                return Mono.just(result);
                            }
                        });
                } else {
                    return clientResponse.bodyToMono(String.class)
                        .flatMap(body -> Mono
                            .error(new DatasetErrorException(clientResponse.statusCode().value(), body)));
                }
            });
    }

}
