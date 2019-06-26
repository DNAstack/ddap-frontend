package com.dnastack.ddapfrontend.client.dam;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
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
            .filter(LoggingFilter.logRequest())
            .filter(LoggingFilter.logResponse())
            .build();



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
