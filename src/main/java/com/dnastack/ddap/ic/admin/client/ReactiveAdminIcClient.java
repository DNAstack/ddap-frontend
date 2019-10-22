package com.dnastack.ddap.ic.admin.client;

import com.dnastack.ddap.common.client.AuthAwareWebClientFactory;
import com.dnastack.ddap.common.client.OAuthFilter;
import com.dnastack.ddap.ic.common.config.IdpProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class ReactiveAdminIcClient {

    private IdpProperties idpProperties;
    private AuthAwareWebClientFactory webClientFactory;

    public ReactiveAdminIcClient(IdpProperties idpProperties, AuthAwareWebClientFactory webClientFactory) {
        this.idpProperties = idpProperties;
        this.webClientFactory = webClientFactory;
    }

    public Mono<Object> getConfig(String realm, String icToken, String refreshToken) {
        final UriTemplate template = new UriTemplate("/identity/v1alpha/{realm}/config" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("realm", realm);
        variables.put("clientId", idpProperties.getClientId());
        variables.put("clientSecret", idpProperties.getClientSecret());

        return webClientFactory.getWebClient(realm, refreshToken, OAuthFilter.Audience.IC)
                .get()
                .uri(idpProperties.getBaseUrl().resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + icToken)
                .retrieve()
                .bodyToMono(Object.class);
    }

}
