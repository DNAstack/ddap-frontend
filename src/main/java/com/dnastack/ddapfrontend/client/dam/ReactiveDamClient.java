package com.dnastack.ddapfrontend.client.dam;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import com.dnastack.ddapfrontend.client.dam.model.*;
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

    public Mono<DamResource> getResource(String realm, String resourceId) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm,
                        "resourceId", resourceId)
        ));

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(DamResource.class);
    }

    public Mono<DamResources> getResources(String realm) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm)
        ));

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(DamResources.class);
    }

    public Mono<DamResourceViews> getResourceViews(String realm, String resourceId, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}/views" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm,
                        "resourceId", resourceId,
                        "clientId", damClientId,
                        "clientSecret", damClientSecret)
        ));

        return webClient.get()
                .uri(uri)
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamResourceViews.class);
    }

    public Mono<LocationAndToken> getAccessTokenForView(String realm, String resourceId, String viewId, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}/views/{viewId}/token" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm,
                        "resourceId", resourceId,
                        "viewId", viewId,
                        "clientId", damClientId,
                        "clientSecret", damClientSecret)
        ));

        return webClient.get()
                .uri(uri)
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(LocationAndToken.class);
    }

    public Mono<DamTargetAdapters> getTargetAdapters(String realm, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/targetAdapters" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm,
                        "clientId", damClientId,
                        "clientSecret", damClientSecret)
        ));

        return webClient.get()
                .uri(uri)
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamTargetAdapters.class);
    }

    public Mono<DamConfig> getConfig(String realm, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final URI uri = damBaseUrl.resolve(template.expand(
                Map.of("realm", realm,
                        "clientId", damClientId,
                        "clientSecret", damClientSecret)
        ));

        return webClient.get()
                .uri(uri)
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamConfig.class);
    }
}
