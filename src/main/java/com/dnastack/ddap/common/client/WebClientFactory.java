package com.dnastack.ddap.common.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.support.TimeoutException;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

import static com.dnastack.ddap.common.util.TimeoutUtil.timeout;

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
                        .filter(LoggingFilter.logResponse())
                        .filter((request, next) -> {
                            switch (request.method()) {
                                case GET:
                                case HEAD:
                                case OPTIONS:
                                    return timeout(next.exchange(request), Duration.ofSeconds(1))
                                            .onErrorResume(TimeoutException.class, ex -> timeout(next.exchange(request), Duration.ofSeconds(10)))
                                            .onErrorResume(TimeoutException.class, ex -> timeout(next.exchange(request), Duration.ofSeconds(20)));
                                default:
                                    return next.exchange(request);
                            }
                        });
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
