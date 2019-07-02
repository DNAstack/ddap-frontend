package com.dnastack.ddapfrontend.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class WebClientFactory {

    private OAuthFilter oAuthFilter;

    @Autowired
    public WebClientFactory(OAuthFilter oAuthFilter) {
        this.oAuthFilter = oAuthFilter;
    }

    private static WebClient.Builder getWebClientBuilder() {
        return WebClient.builder()
                .filter(LoggingFilter.logRequest())
                .filter(LoggingFilter.logResponse());
    }

    public WebClient getWebClient() {
        return WebClientFactory.getWebClientBuilder()
                .build();
    }

    public WebClient getWebClient(String realm, String refreshToken, OAuthFilter.Audience audience) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return getWebClient();
        }
        return WebClientFactory.getWebClientBuilder()
                .filter(oAuthFilter.refreshAccessTokenFilter(realm, refreshToken, audience))
                .build();
    }

}
