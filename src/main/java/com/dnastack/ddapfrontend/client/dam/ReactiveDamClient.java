package com.dnastack.ddapfrontend.client.dam;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import com.dnastack.ddapfrontend.client.dam.model.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class ReactiveDamClient {

    private URI damBaseUrl;
    private String damClientId;
    private String damClientSecret;

    private static final WebClient webClient = WebClient.builder()
            .filter(LoggingFilter.logRequest())
            .filter(LoggingFilter.logResponse())
            .build();

    @Data
    private static class ResourceResponse {
        private DamResource resource;
        private List<String> access;
    }

    public ReactiveDamClient(@Value("${dam.base-url}") URI damBaseUrl,
                             @Value("${dam.client-id}") String damClientId,
                             @Value("${dam.client-secret}") String damClientSecret) {
        this.damBaseUrl = damBaseUrl;
        this.damClientId = damClientId;
        this.damClientSecret = damClientSecret;
    }

    public Mono<DamResource> getResource(String realm, String resourceId) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("resourceId", resourceId);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClient.get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .retrieve()
                .bodyToMono(ResourceResponse.class)
                .map(ResourceResponse::getResource);
    }

    public Mono<DamResources> getResources(String realm) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClient.get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .retrieve()
                .bodyToMono(DamResources.class);
    }

    public Mono<DamResourceViews> getResourceViews(String realm, String resourceId, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}/views" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("resourceId", resourceId);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClient.get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamResourceViews.class);
    }

    public Mono<LocationAndToken> getAccessTokenForView(String realm, String resourceId, String viewId, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}/views/{viewId}/token" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("resourceId", resourceId);
        variables.put("viewId", viewId);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClient.get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(LocationAndToken.class);
    }

    public Mono<DamTargetAdapters> getTargetAdapters(String realm, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/targetAdapters" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClient.get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamTargetAdapters.class);
    }

    public Mono<DamConfig> getConfig(String realm, String damToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClient.get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamConfig.class);
    }
}
