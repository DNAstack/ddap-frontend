package com.dnastack.ddap.common.client;

import org.springframework.cloud.gateway.support.TimeoutException;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

import static com.dnastack.ddap.common.util.TimeoutUtil.timeout;

public class WebClientFactory {

    public static WebClient.Builder getWebClientBuilder() {
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

    public static WebClient getWebClient() {
        return WebClientFactory.getWebClientBuilder()
                .build();
    }

}
