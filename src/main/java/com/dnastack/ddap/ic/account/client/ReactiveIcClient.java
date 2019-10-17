package com.dnastack.ddap.ic.account.client;

import com.dnastack.ddap.common.client.OAuthFilter;
import com.dnastack.ddap.common.client.WebClientFactory;
import com.dnastack.ddap.ic.account.client.model.IcAccount;
import com.dnastack.ddap.ic.oauth.client.ReactiveOAuthClient;
import com.dnastack.ddap.ic.oauth.client.TokenExchangeException;
import com.dnastack.ddap.ic.oauth.client.model.TokenResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;
import static java.lang.String.format;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class ReactiveIcClient {

    private URI idpBaseUrl;
    private String idpClientId;
    private String idpClientSecret;

    private ReactiveOAuthClient oAuthClient;
    private WebClientFactory webClientFactory;

    public ReactiveIcClient(@Value("${idp.base-url}") URI idpBaseUrl,
                            @Value("${idp.client-id}") String idpClientId,
                            @Value("${idp.client-secret}") String idpClientSecret,
                            ReactiveOAuthClient oAuthClient,
                            WebClientFactory webClientFactory) {
        this.idpBaseUrl = idpBaseUrl;
        this.idpClientId = idpClientId;
        this.idpClientSecret = idpClientSecret;
        this.oAuthClient = oAuthClient;
        this.webClientFactory = webClientFactory;
    }

    public Mono<Object> getConfig(String realm, String icToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .get()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + icToken)
                .retrieve()
                .bodyToMono(Object.class);
    }

    public Mono<IcAccount> getAccounts(String realm, Map<CookieKind, String> tokens) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/accounts/-" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        return webClientFactory.getWebClient(realm, tokens.get(CookieKind.REFRESH), OAuthFilter.Audience.IC)
                .get()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + tokens.get(CookieKind.IC))
                .retrieve()
                .bodyToMono(IcAccount.class);
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

        return webClientFactory.getWebClient()
                .get()
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
                }).flatMap(code -> oAuthClient.exchangeAuthorizationCodeForTokens(realm, redirectUri, code));
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

    public Mono<String> linkAccounts(String realm,
                                     String baseAccountId,
                                     String baseAccountAccessToken,
                                     String newAccountId,
                                     String newAccountLinkToken,
                                     String refreshToken) {
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

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .patch()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + baseAccountAccessToken)
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
                                      String refreshToken,
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

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .delete()
                .uri(idpBaseUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + accountAccessToken)
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
