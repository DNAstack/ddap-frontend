package com.dnastack.ddap.dam.admin.client;

import com.dnastack.ddap.common.client.AuthAwareWebClientFactory;
import com.dnastack.ddap.common.client.OAuthFilter;
import com.dnastack.ddap.common.client.ProtobufDeserializer;
import com.dnastack.ddap.common.client.WebClientFactory;
import dam.v1.DamService.*;
import dam.v1.DamService.GetFlatViewsResponse.FlatView;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
public class ReactiveDamClient {

    private URI damBaseUrl;
    private String damClientId;
    private String damClientSecret;
    private AuthAwareWebClientFactory webClientFactory;

    public ReactiveDamClient(URI damBaseUrl,
                             String damClientId,
                             String damClientSecret,
                             AuthAwareWebClientFactory webClientFactory) {
        this.damBaseUrl = damBaseUrl;
        this.damClientId = damClientId;
        this.damClientSecret = damClientSecret;
        this.webClientFactory = webClientFactory;
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
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, DamConfig.getDefaultInstance()));
    }

    public Mono<GetInfoResponse> getDamInfo() {
        return WebClientFactory.getWebClient()
            .get()
            .uri(damBaseUrl.resolve("/dam"))
            .retrieve()
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, GetInfoResponse.getDefaultInstance()));
    }

    public Mono<Resource> getResource(String realm, String resourceId) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources/{resourceId}" +
            "?client_id={clientId}" +
            "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("resourceId", resourceId);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return WebClientFactory.getWebClient()
            .get()
            .uri(damBaseUrl.resolve(template.expand(variables)))
            .retrieve()
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, GetResourceResponse.getDefaultInstance()))
            .map(GetResourceResponse::getResource);
    }

    public Mono<GetResourcesResponse> getResources(String realm) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/resources" +
            "?client_id={clientId}" +
            "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", damClientId);
        variables.put("clientSecret", damClientSecret);

        return WebClientFactory.getWebClient()
            .get()
            .uri(damBaseUrl.resolve(template.expand(variables)))
            .retrieve()
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, GetResourcesResponse.getDefaultInstance()));
    }

    public Mono<GetViewsResponse> getResourceViews(String realm,
                                                   String resourceId,
                                                   String damToken,
                                                   String refreshToken) {
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
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, GetViewsResponse.getDefaultInstance()));
    }

    public Mono<GetTokenResponse> getAccessTokenForView(String realm,
                                                        String resourceId,
                                                        String viewId,
                                                        String damToken,
                                                        String refreshToken) {
        final UriTemplate template = new UriTemplate(
            "/dam/v1alpha/{realm}/resources/{resourceId}/views/{viewId}/token" +
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
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, GetTokenResponse.getDefaultInstance()));
    }

    public Mono<TargetAdaptersResponse> getTargetAdapters(String realm, String damToken, String refreshToken) {
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
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, TargetAdaptersResponse.getDefaultInstance()));
    }

    public Mono<Map<String, FlatView>> getFlattenedViews(String realm, String damToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/dam/v1alpha/{realm}/flatViews" +
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
            .bodyToMono(String.class)
            .flatMap(json -> ProtobufDeserializer.fromJson(json, GetFlatViewsResponse.getDefaultInstance()))
            .map(GetFlatViewsResponse::getViewsMap);

    }
}
