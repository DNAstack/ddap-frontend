package com.dnastack.ddapfrontend.client.dam;

import com.dnastack.ddapfrontend.client.OAuthFilter;
import com.dnastack.ddapfrontend.client.WebClientFactory;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import dam.v1.DamService.*;
import dam.v1.DamService.GetFlatViewsResponse.Builder;
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

    private WebClientFactory webClientFactory;


    public ReactiveDamClient(URI damBaseUrl,
        String damClientId,
        String damClientSecret,
        WebClientFactory webClientFactory) {
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
                .flatMap(jsonString -> {
                    try {
                        DamConfig.Builder builder = DamConfig.newBuilder();
                        JsonFormat.parser().merge(jsonString, builder);
                        return Mono.just(builder.build());
                    } catch (InvalidProtocolBufferException e) {
                        return Mono.error(e);
                    }
                });
    }

    public Mono<GetInfoResponse> getDamInfo() {
        return webClientFactory.getWebClient()
                .get()
                .uri(damBaseUrl.resolve("/dam"))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(jsonString -> {
                    try {
                        GetInfoResponse.Builder builder = GetInfoResponse.newBuilder();
                        JsonFormat.parser().merge(jsonString, builder);
                        return Mono.just(builder.build());
                    } catch (InvalidProtocolBufferException e) {
                        return Mono.error(e);
                    }
                });
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

        return webClientFactory.getWebClient()
            .get()
            .uri(damBaseUrl.resolve(template.expand(variables)))
            .retrieve()
            .bodyToMono(String.class)
            .flatMap(jsonString -> {
                try {
                    GetResourceResponse.Builder builder = GetResourceResponse.newBuilder();
                    JsonFormat.parser().merge(jsonString, builder);
                    return Mono.just(builder.build());
                } catch (InvalidProtocolBufferException e) {
                    return Mono.error(e);
                }
            })
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

        return webClientFactory.getWebClient()
            .get()
            .uri(damBaseUrl.resolve(template.expand(variables)))
            .retrieve()
            .bodyToMono(String.class)
            .flatMap(jsonString -> {
                try {
                    GetResourcesResponse.Builder builder = GetResourcesResponse.newBuilder();
                    JsonFormat.parser().merge(jsonString, builder);
                    return Mono.just(builder.build());
                } catch (InvalidProtocolBufferException e) {
                    return Mono.error(e);
                }
            });
    }

    public Mono<GetViewsResponse> getResourceViews(String realm, String resourceId, String damToken, String refreshToken) {
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
            .flatMap(jsonString -> {
                try {
                    GetViewsResponse.Builder builder = GetViewsResponse.newBuilder();
                    JsonFormat.parser().merge(jsonString, builder);
                    return Mono.just(builder.build());
                } catch (InvalidProtocolBufferException e) {
                    return Mono.error(e);
                }
            });
    }

    public Mono<GetTokenResponse> getAccessTokenForView(String realm, String resourceId, String viewId, String damToken,
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
            .flatMap(jsonString -> {
                try {
                    GetTokenResponse.Builder builder = GetTokenResponse.newBuilder();
                    JsonFormat.parser().merge(jsonString, builder);
                    return Mono.just(builder.build());
                } catch (InvalidProtocolBufferException e) {
                    return Mono.error(e);
                }
            });
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
            .flatMap(jsonString -> {
                try {
                    TargetAdaptersResponse.Builder builder = TargetAdaptersResponse.newBuilder();
                    JsonFormat.parser().merge(jsonString, builder);
                    return Mono.just(builder.build());
                } catch (InvalidProtocolBufferException e) {
                    return Mono.error(e);
                }
            });
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
            .flatMap(jsonString -> {
                try {
                    Builder builder = GetFlatViewsResponse.newBuilder();
                    JsonFormat.parser().merge(jsonString, builder);
                    return Mono.just(builder.build().getViewsMap());
                } catch (InvalidProtocolBufferException e) {
                    return Mono.error(e);
                }
            });

    }
}
