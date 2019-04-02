package com.dnastack.ddapfrontend.client.ic;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static java.lang.String.format;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Slf4j
@Component
public class IdentityConcentratorClient {

    @Value("${idp.base-url}")
    private URI idpBaseUrl;

    @Value("${idp.client-id}")
    private String idpClientId;

    @Value("${idp.client-secret}")
    private String idpClientSecret;

    @Autowired
    private WebClient webClient;

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

        final URI uri = idpBaseUrl.resolve(template.expand(variables));
        return webClient
                .post()
                .uri(uri)
                .header("authorization", "Bearer " + code)
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

    public Mono<TokenResponse> personaLogin(String realm, String scopes, String personaName) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/personas/{persona}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}" +
                "&scope={scopes}");

        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("persona", personaName);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);
        variables.put("scopes", scopes);

        URI uri = idpBaseUrl.resolve(template.expand(variables));
        Mono<TokenResponse> scopedAccessTokenResponse = webClient
                .get()
                .uri(uri)
                .exchange()
                .flatMap(this::extractIdpTokens);

        Mono<TokenResponse> defaultScopeAllTokensResponse = getPersonaTokens(realm, personaName);

        return Mono.zip(scopedAccessTokenResponse, defaultScopeAllTokensResponse)
                .map(bothTokens -> bothTokens.getT2().toBuilder()
                        .accessToken(bothTokens.getT1().getAccessToken())
                        .build());
    }

    private Mono<TokenResponse> getPersonaTokens(String realm, String personaName) {
        final UriTemplate passportTemplate = new UriTemplate("/identity/v1alpha/{realm}/passport" +
                "?persona={persona}" +
                "&client_id={clientId}" +
                "&client_secret={clientSecret}");

        final Map<String, Object> passportVariables = new HashMap<>();
        passportVariables.put("realm", realm);
        passportVariables.put("persona", personaName);
        passportVariables.put("clientId", idpClientId);
        passportVariables.put("clientSecret", idpClientSecret);
        return webClient.get()
                .uri(idpBaseUrl.resolve(passportTemplate.expand(passportVariables)))
                .exchange()
                .flatMap(res -> res.bodyToMono(TokenResponse.class));
    }

    public URI getAuthorizeUrl(String realm, String state, String scopes, URI redirectUri) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/authorize" +
                "?response_type=code" +
                "&clientId={clientId}" +
                "&redirect_uri={redirectUri}" +
                "&state={state}" +
                "&scope={scope}");

        final HashMap<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("redirectUri", redirectUri);
        variables.put("state", state);
        variables.put("scope", scopes);

        return idpBaseUrl.resolve(template.expand(variables));
    }

    /**
     * Returns the URL that initiates an external login with a given identity provider (which must already be registered
     * and configured in the remote Identity Concentrator).
     *
     * @param realm       the target realm for the IC login (should match the realm in redirectUri)
     * @param state       the OAuth state cookie that should be appended to the given redirectUri.
     * @param scopes      the scopes to request from the IC (these are IC scope names, not scopes with the external provider)
     * @param redirectUri where the IC should redirect back to once the login has compelted
     * @param provider    the ID Provider name as registered with the IC
     * @return the calculated absolute URI to send the client's browser to. Never null.
     */
    public URI getDirectLoginUrl(String realm, String state, String scopes, URI redirectUri, String provider) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/login/{provider}" +
                "?client_id={clientId}" +
                "&redirect_uri={redirectUri}" +
                "&scope={scopes}" +
                "&state={state}");

        final HashMap<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("provider", provider);
        variables.put("clientId", idpClientId);
        variables.put("redirectUri", redirectUri);
        variables.put("scopes", scopes);
        variables.put("state", state);

        return idpBaseUrl.resolve(template.expand(variables));
    }

    private static boolean contentTypeIsApplicationJson(ClientResponse response) {
        return response.headers()
                .contentType()
                .filter(mediaType -> mediaType.isCompatibleWith(
                        APPLICATION_JSON))
                .isPresent();
    }

    public Mono<String> linkAccounts(String realm,
                                     String baseAccountId,
                                     String baseAccountAccessToken,
                                     String newAccountId,
                                     String newAccountLinkToken) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/accounts/{accountId}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}" +
                "&link_token={linkToken}");

        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("accountId", baseAccountId);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);
        variables.put("linkToken", newAccountLinkToken);

        URI uri = idpBaseUrl.resolve(template.expand(variables));
        return webClient
                .patch()
                .uri(uri)
                .header("Authorization", "Bearer " + baseAccountAccessToken)
                .exchange()
                .flatMap(response -> {
                    if (response.statusCode().is2xxSuccessful()) {
                        return Mono.just(format("Successfully linked [%s] into base account [%s]", newAccountId, baseAccountId));
                    } else {
                        return response.bodyToMono(String.class)
                                .flatMap(errorMessage -> Mono.error(new AccountLinkingFailedException("Link failed: " + errorMessage)));
                    }
                });
    }
}
