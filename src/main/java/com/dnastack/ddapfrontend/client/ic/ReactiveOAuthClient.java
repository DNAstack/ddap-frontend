package com.dnastack.ddapfrontend.client.ic;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import com.dnastack.ddapfrontend.client.ic.model.TokenResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Slf4j
@Component
public class ReactiveOAuthClient {

    private URI idpBaseUrl;
    private String idpClientId;
    private String idpClientSecret;

    private static final WebClient webClient = WebClient.builder()
            .filter(LoggingFilter.logRequest())
            .filter(LoggingFilter.logResponse())
            .build();

    public ReactiveOAuthClient(@Value("${idp.base-url}") URI idpBaseUrl,
                               @Value("${idp.client-id}") String idpClientId,
                               @Value("${idp.client-secret}") String idpClientSecret) {
        this.idpBaseUrl = idpBaseUrl;
        this.idpClientId = idpClientId;
        this.idpClientSecret = idpClientSecret;
    }

    public Mono<TokenResponse> exchangeAuthorizationCodeForTokens(String realm, URI redirectUri, String code) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/token" +
                "?grant_type=authorization_code" +
                "&code={code}" +
                "&redirect_uri={redirectUri}" +
                "&clientId={clientId}" +
                "&clientSecret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("code", code);
        variables.put("redirectUri", redirectUri);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.post()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + code)
                .exchange()
                .flatMap(this::extractIdpTokens);
    }

    public Mono<TokenResponse> refreshAccessToken(String realm, String refreshToken) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/token" +
                "?grant_type=refresh_token" +
                "&refresh_token={refreshToken}" +
                "&clientId={clientId}" +
                "&clientSecret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("refreshToken", refreshToken);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.post()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .exchange()
                .flatMap(this::extractIdpTokens);
    }

    private Mono<TokenResponse> extractIdpTokens(ClientResponse idpTokenResponse) {
        if (idpTokenResponse.statusCode().is2xxSuccessful() && contentTypeIsApplicationJson(idpTokenResponse)) {
            return idpTokenResponse.bodyToMono(TokenResponse.class);
        } else {
            return idpTokenResponse.bodyToMono(String.class)
                    .flatMap(errorBody -> Mono.error(new TokenExchangeException(errorBody)));
        }
    }

    private static boolean contentTypeIsApplicationJson(ClientResponse response) {
        return response.headers()
                .contentType()
                .filter(mediaType -> mediaType.isCompatibleWith(
                        APPLICATION_JSON))
                .isPresent();
    }

    public URI getAuthorizeUrl(String realm, String state, String scopes, URI redirectUri, String loginHint) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/authorize" +
                "?response_type=code" +
                "&clientId={clientId}" +
                "&redirect_uri={redirectUri}" +
                "&state={state}" +
                "&scope={scopes}" +
                "&login_hint={loginHint}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("state", state);
        variables.put("scopes", scopes);
        variables.put("redirectUri", redirectUri);
        variables.put("loginHint", loginHint);
        variables.put("clientId", idpClientId);

        return idpBaseUrl.resolve(template.expand(variables));
    }

}
