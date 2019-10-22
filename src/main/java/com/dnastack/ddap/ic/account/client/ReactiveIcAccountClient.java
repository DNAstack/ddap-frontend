package com.dnastack.ddap.ic.account.client;

import com.dnastack.ddap.common.client.AuthAwareWebClientFactory;
import com.dnastack.ddap.common.client.OAuthFilter;
import com.dnastack.ddap.ic.account.client.model.IcAccount;
import com.dnastack.ddap.ic.common.config.IdpProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;
import static java.lang.String.format;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class ReactiveIcAccountClient {

    private IdpProperties idpProperties;
    private AuthAwareWebClientFactory webClientFactory;

    public ReactiveIcAccountClient(IdpProperties idpProperties, AuthAwareWebClientFactory webClientFactory) {
        this.idpProperties = idpProperties;
        this.webClientFactory = webClientFactory;
    }

    public Mono<IcAccount> getAccounts(String realm, Map<CookieKind, String> tokens) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/accounts/-" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpProperties.getClientId());
        variables.put("clientSecret", idpProperties.getClientSecret());

        return webClientFactory.getWebClient(realm, tokens.get(CookieKind.REFRESH), OAuthFilter.Audience.IC)
                .get()
                .uri(idpProperties.getBaseUrl().resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + tokens.get(CookieKind.IC))
                .retrieve()
                .bodyToMono(IcAccount.class);
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
        variables.put("clientId", idpProperties.getClientId());
        variables.put("clientSecret", idpProperties.getClientSecret());

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .patch()
                .uri(idpProperties.getBaseUrl().resolve(template.expand(variables)))
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
        variables.put("clientId", idpProperties.getClientId());
        variables.put("clientSecret", idpProperties.getClientSecret());

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .delete()
                .uri(idpProperties.getBaseUrl().resolve(template.expand(variables)))
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
