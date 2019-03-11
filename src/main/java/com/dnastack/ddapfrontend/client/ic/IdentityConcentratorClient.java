package com.dnastack.ddapfrontend.client.ic;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@Component
public class IdentityConcentratorClient {

    @Value("${idp.base-url}")
    private URI idpBaseUrl;

    @Value("${idp.client-id}")
    private String idpClientId;

    @Value("${idp.client-secret}")
    private String idpClientSecret;

    public Mono<TokenResponse> exchangeAuthorizationCodeForTokens(String realm, URI redirectUri, String code) {
        final UriTemplate template = new UriTemplate("{idpBaseUrl}/identity/v1alpha/{realm}/token" +
                "?grant_type=authorization_code" +
                "&code={code}" +
                "&redirect_uri={redirectUri}" +
                "&clientId={clientId}" +
                "&clientSecret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("idpBaseUrl", idpBaseUrl);
        variables.put("realm", realm);
        variables.put("code", code);
        variables.put("redirectUri", redirectUri);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        final URI uri = template.expand(variables);
        return WebClient.create(uri.toString())
                .post()
                .exchange()
                .flatMap(this::extractIdpTokens);
    }

    private Mono<TokenResponse> extractIdpTokens(ClientResponse idpTokenResponse) {
        if (idpTokenResponse.statusCode().is2xxSuccessful() && contentTypeIsApplicationJson(idpTokenResponse)) {
            return idpTokenResponse.bodyToMono(TokenResponse.class);
        } else {
            return Mono.error(new TokenExchangeException(idpTokenResponse));
        }
    }

    public URI getPersonaLoginUrl(URI redirectUri, String realm, String personaName) {
        final UriTemplate template = new UriTemplate("{idpBaseUrl}/identity/v1alpha/{realm}/personas/{persona}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}" +
                "&redirect_uri={redirectUri}" +
                "&scope=ga4gh+account_admin");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("idpBaseUrl", idpBaseUrl);
        variables.put("persona", personaName);
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);
        variables.put("redirectUri", redirectUri);

        return template.expand(variables);
    }

    public URI getAuthorizeUrl(URI redirectUri, String realm) {
        final UriTemplate template = new UriTemplate("{idpBaseUrl}/identity/v1alpha/{realm}/authorize?response_type=code&clientId={clientId}&redirect_uri={redirectUri}");

        final HashMap<String, Object> variables = new HashMap<>();
        variables.put("idpBaseUrl", idpBaseUrl);
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("redirectUri", redirectUri);

        return template.expand(variables);
    }

    private static boolean contentTypeIsApplicationJson(ClientResponse response) {
        return response.headers()
                .contentType()
                .filter(mediaType -> mediaType.isCompatibleWith(
                        APPLICATION_JSON))
                .isPresent();
    }

}
