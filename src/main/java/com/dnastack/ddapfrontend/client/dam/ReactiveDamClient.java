package com.dnastack.ddapfrontend.client.dam;

import com.dnastack.ddapfrontend.client.OAuthFilter;
import com.dnastack.ddapfrontend.client.WebClientFactory;
import com.dnastack.ddapfrontend.client.dam.model.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
public class ReactiveDamClient {

    private URI damBaseUrl;
    private String damClientId;
    private String damClientSecret;

    private WebClientFactory webClientFactory;

    @Data
    private static class ResourceResponse {
        private DamResource resource;
        private List<String> access;
    }

    public ReactiveDamClient(URI damBaseUrl,
                             String damClientId,
                             String damClientSecret,
                             WebClientFactory webClientFactory) {
        this.damBaseUrl = damBaseUrl;
        this.damClientId = damClientId;
        this.damClientSecret = damClientSecret;
        this.webClientFactory = webClientFactory;
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

        return webClientFactory.getWebClient()
                .get()
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

        return webClientFactory.getWebClient()
                .get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .retrieve()
                .bodyToMono(DamResources.class);
    }

    public Mono<DamResourceViews> getResourceViews(String realm, String resourceId, String damToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}/views" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("resourceId", resourceId);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
              .header(AUTHORIZATION, "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamResourceViews.class);
    }

    public Mono<LocationAndToken> getAccessTokenForView(String realm, String resourceId, String viewId, String damToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}/views/{viewId}/token" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("resourceId", resourceId);
        variables.put("viewId", viewId);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + damToken)
                .retrieve()
                .bodyToMono(LocationAndToken.class);
    }

    public Mono<DamTargetAdapters> getTargetAdapters(String realm, String damToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/targetAdapters" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
              .header(AUTHORIZATION, "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamTargetAdapters.class);
    }

    public Mono<DamConfig> getConfig(String realm, String damToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .get()
                .uri(damBaseUrl.resolve(template.expand(variables)))
              .header(AUTHORIZATION, "Bearer " + damToken)
                .retrieve()
                .bodyToMono(DamConfig.class);
    }

    public Mono<DamInfo> getDamInfo() {
        return webClientFactory.getWebClient()
                               .get()
                               .uri(damBaseUrl.resolve("/dam"))
                               .retrieve()
                               .bodyToMono(DamInfo.class);
    }
}
