package com.dnastack.ddap.common.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthAwareWebClientFactory {

    private OAuthFilter oAuthFilter;

    @Autowired
    public AuthAwareWebClientFactory(OAuthFilter oAuthFilter) {
        this.oAuthFilter = oAuthFilter;
    }

    public WebClient getWebClient(String realm, String refreshToken, OAuthFilter.Audience audience) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return WebClientFactory.getWebClient();
        }
        return WebClientFactory.getWebClientBuilder()
                .filter(oAuthFilter.refreshAccessTokenFilter(realm, refreshToken, audience))
                .build();
    }

}
