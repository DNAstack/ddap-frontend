package com.dnastack.ddap.explore.dataset.client;

import com.dnastack.ddap.common.client.LoggingFilter;
import com.dnastack.ddap.explore.dataset.client.model.DatasetResult;
import com.dnastack.ddap.explore.dataset.client.model.Tuple;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.*;

@Slf4j
@Component
public class ReactiveDatasetClient {

    private static final WebClient webClient = WebClient.builder()
        .filter(ReactiveDatasetClient.modifyContentType())
        .filter(LoggingFilter.logRequest())
        .filter(LoggingFilter.logResponse())
        .build();

    private static ExchangeFilterFunction modifyContentType() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            ClientResponse.Builder clientResponseCopy = ClientResponse.from(clientResponse);
            Flux<DataBuffer> body = clientResponse.body(BodyExtractors.toDataBuffers());
            clientResponseCopy.body(body);
            clientResponseCopy.headers(httpHeaders -> httpHeaders.setContentType(MediaType.APPLICATION_JSON));
            ClientResponse response = clientResponseCopy.build();
            return Mono.just(response);
        });
    }

    public Mono<DatasetResult> fetchSingleDataset(String datasetUrl, String viewAccessToken) {
        log.info("Attempting to fetch dataset {}", datasetUrl);
        return webClient.get()
            .uri(datasetUrl)
            .headers(h -> {
                if (viewAccessToken != null) {
                    log.info("Attaching bearer token to dataset request");
                    h.setBearerAuth(viewAccessToken);
                }
            })
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .flatMap(clientResponse -> {
                log.debug("Received response from dataset request");
                if (clientResponse.statusCode().is2xxSuccessful()) {
                    log.info("Received 2xx response from dataset request");
                    return clientResponse.bodyToMono(DatasetResult.class)
                        .flatMap(result -> {
                            log.trace("Content of dataset response: {}", result);
                            if (result.getSchema() == null) {
                                return Mono.error(new DatasetErrorException(null, "DatasetModel schema is not defined"));
                            } else {
                                log.debug("Attempting to in-line schema");
                                return materializeInLineSchema(datasetUrl, result);
                            }
                        })
                        .onErrorMap(ex -> new DatasetErrorException(clientResponse.statusCode().value(), ex.getMessage(), ex));
                } else {
                    return clientResponse.bodyToMono(String.class)
                        .flatMap(body -> Mono
                            .error(new DatasetErrorException(clientResponse.statusCode().value(), body)));
                }
            });
    }


    private Mono<DatasetResult> materializeInLineSchema(String datasetUrl, DatasetResult datasetResult) {
        Map<String, Object> schema = datasetResult.getSchema();
        return resolveSchemaObject(URI.create(datasetUrl), schema)
                .flatMap(resolvedSchema -> {
                    log.trace("Resolved schema: {}", resolvedSchema);
                    return Mono.just(new DatasetResult(datasetResult.getObjects(),
                                                       datasetResult.getPagination(),
                                                       resolvedSchema));
                }
        );
    }


    private Mono<Map<String, Object>> resolveSchemaObject(URI context, Map<String, Object> schema) {
        if (schema.isEmpty()) {
            log.debug("Empty schema; not in-lining");
            return Mono.just(schema);
        }

        final Object ref = schema.get("$ref");
        if (ref != null) {
            log.debug("Attempting to resolve $ref [{}] in schema", ref);
            return resolveReferencedSchema(context, (String) ref);
        }

        log.debug("$ref was null");
        List<Mono<Tuple<String, Object>>> monos = new ArrayList<>();
        for (Map.Entry<String, Object> entry : schema.entrySet()) {

            if (entry.getValue() instanceof Map) {
                Mono<Tuple<String, Object>> mono = resolveSchemaObject(context, (Map<String, Object>) entry.getValue())
                    .flatMap(resolvedSchema -> Mono.just(new Tuple<>(entry.getKey(), resolvedSchema)));
                monos.add(mono);
            } else if (entry.getValue() instanceof Collection) {
                Mono<Tuple<String, Object>> mono = resolveSchemaArray(context, (Collection<?>) entry.getValue())
                    .flatMap(resolvedSchema -> Mono.just(new Tuple<>(entry.getKey(), resolvedSchema)));
                monos.add(mono);
            } else {
                monos.add(Mono.just(new Tuple(entry.getKey(), entry.getValue())));
            }
        }

        return Mono.zip(monos, objects -> {
            Map<String, Object> resolvedSchemaMap = new HashMap<>();
            for (Object object : objects) {
                Tuple<String, Object> tuple = (Tuple<String, Object>) object;
                resolvedSchemaMap.put(tuple.getX(), tuple.getY());
            }
            return resolvedSchemaMap;
        });
    }


    private Mono<Collection<?>> resolveSchemaArray(URI context, Collection<?> schema) {
        if (schema.isEmpty()) {
            return Mono.just(schema);
        }
        List<Mono<Object>> monos = new ArrayList<>();
        for (Object item : schema) {
            if (item instanceof Map) {
                monos.add(resolveSchemaObject(context, (Map<String, Object>) item).flatMap(Mono::just));
            } else if (item instanceof Collection) {
                monos.add(resolveSchemaArray(context, (Collection<?>) item).flatMap(Mono::just));
            } else {
                monos.add(Mono.just(item));
            }
        }

        return Mono.zip(monos, Arrays::asList);
    }

    private Mono<Map<String, Object>> resolveReferencedSchema(URI context, String reference) {
        if (reference.startsWith("#/")) {
            return Mono.just(Collections.singletonMap("$ref", reference));
        }

        URI referenceUri = URI.create(reference);
        URI uriToFetch;

        if (referenceUri.getScheme() != null && referenceUri.getHost() != null) {
            uriToFetch = referenceUri;
        } else {
            uriToFetch = context.resolve(referenceUri);
        }

        //TODO add cache here (governed by cache control header)

        return webClient.get().uri(uriToFetch).accept(MediaType.APPLICATION_JSON).exchange().flatMap(clientResponse -> {
            if (clientResponse.statusCode().is2xxSuccessful()) {
                return clientResponse.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                }).flatMap(resolvedSchema -> resolveSchemaObject(uriToFetch, resolvedSchema));
            } else {
                return clientResponse.bodyToMono(String.class)
                    .flatMap(body -> Mono
                        .error(new DatasetErrorException(clientResponse.statusCode().value(), body)));
            }
        });

    }



}
