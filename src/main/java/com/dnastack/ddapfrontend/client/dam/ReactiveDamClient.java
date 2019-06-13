package com.dnastack.ddapfrontend.client.dam;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Map;

@Slf4j
@Component
public class ReactiveDamClient {

    private URI damBaseUrl;
    private String damClientId;
    private String damClientSecret;

    public ReactiveDamClient(@Value("${dam.base-url}") URI damBaseUrl,
                             @Value("${dam.client-id}") String damClientId,
                             @Value("${dam.client-secret}") String damClientSecret) {
        this.damBaseUrl = damBaseUrl;
        this.damClientId = damClientId;
        this.damClientSecret = damClientSecret;
    }

    private static final WebClient webClient = WebClient.builder()
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

    public Mono<Object> getConfig(String realm, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm,
                        "clientId", damClientId,
                        "clientSecret", damClientSecret)
        ));

        return webClient
                .get()
                .uri(uri)
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(Object.class);
    }

}
