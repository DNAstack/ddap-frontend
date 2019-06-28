package com.dnastack.ddapfrontend.client.ic;

import com.dnastack.ddapfrontend.client.LoggingFilter;
import com.dnastack.ddapfrontend.client.ic.model.IcAccount;
import com.dnastack.ddapfrontend.client.ic.model.TokenResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static java.lang.String.format;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Slf4j
@Component
public class ReactiveIcClient {

    private URI idpBaseUrl;
    private String idpClientId;
    private String idpClientSecret;

    private static final WebClient webClient = WebClient.builder()
            .filter(LoggingFilter.logRequest())
            .filter(LoggingFilter.logResponse())
            .build();

    public ReactiveIcClient(@Value("${idp.base-url}") URI idpBaseUrl,
                            @Value("${idp.client-id}") String idpClientId,
                            @Value("${idp.client-secret}") String idpClientSecret) {
        this.idpBaseUrl = idpBaseUrl;
        this.idpClientId = idpClientId;
        this.idpClientSecret = idpClientSecret;
    }

    public Mono<Object> getConfig(String realm, String icToken) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.get()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + icToken)
                .retrieve()
                .bodyToMono(Object.class);
    }

    public Mono<IcAccount> getAccounts(String realm, String icToken) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/accounts/-" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.get()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + icToken)
                .retrieve()
                .bodyToMono(IcAccount.class);
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
                .header("authorization", "Bearer " + code)
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

    public Mono<TokenResponse> personaLogin(String realm, String scopes, String personaName, URI redirectUri) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/personas/{persona}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}" +
                "&scope={scopes}" +
                "&redirect_uri={redirectUri}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("persona", personaName);
        variables.put("scopes", scopes);
        variables.put("redirectUri", redirectUri);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.get()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .exchange()
                .flatMap(clientResponse -> {
                    if (clientResponse.statusCode().is3xxRedirection()) {
                        final String location = clientResponse.headers().header("Location").get(0);
                        final String code = UriComponentsBuilder.fromHttpUrl(location)
                                .build()
                                .getQueryParams()
                                .getFirst("code");
                        return Mono.just(code);
                    } else {
                        return clientResponse.bodyToMono(String.class)
                                .flatMap(body -> Mono.error(new TokenExchangeException(format(
                                        "Unexpected result doing persona login: [%s] %s",
                                        clientResponse.statusCode(),
                                        body))));
                    }
                }).flatMap(code -> exchangeAuthorizationCodeForTokens(realm, redirectUri, code));
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
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("state", state);
        variables.put("scopes", scopes);
        variables.put("redirectUri", redirectUri);
        variables.put("provider", provider);
        variables.put("clientId", idpClientId);

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
        variables.put("linkToken", newAccountLinkToken);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.patch()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
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

    public Mono<String> unlinkAccount(String realm,
                                      String accountId,
                                      String accountAccessToken,
                                      String subjectName) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/accounts/{accountId}/subjects/{subjectName}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("accountId", accountId);
        variables.put("subjectName", subjectName);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClient.delete()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header("Authorization", "Bearer " + accountAccessToken)
                .exchange()
                .flatMap(response -> {
                    if (response.statusCode().is2xxSuccessful()) {
                        return Mono.just(format("Successfully unlinked [%s] from account [%s]", subjectName, accountId));
                    } else {
                        return response.bodyToMono(String.class)
                                .flatMap(errorMessage -> Mono.error(new AccountLinkingFailedException("Unlink failed: " + errorMessage)));
                    }
                });
    }
}
