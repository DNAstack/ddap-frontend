/*
 * Copyright 2013-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.dnastack.ddapfrontend.proxy;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeoutException;

import static com.dnastack.ddapfrontend.proxy.TimeoutWithRetryGatewayFilterFactory.Config;
import static java.lang.String.format;
import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR;
import static org.springframework.http.HttpMethod.*;

/**
 * Limits response time of requests and retries a configurable number of times.
 */
@Slf4j
@Component
public class TimeoutWithRetryGatewayFilterFactory extends AbstractGatewayFilterFactory<Config> {

    private final WebClient webClient;

    @Autowired
    public TimeoutWithRetryGatewayFilterFactory(WebClient webClient) {
        super(Config.class);
        this.webClient = webClient;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            final HttpMethod method = exchange.getRequest().getMethod();
            if (config.getApplicableMethods().contains(method)) {
                Mono<Void> action = chain.filter(exchange)
                                         .timeout(Duration.ofMillis(config.getBaseTimeout()))
                                         // Log this here because the logging filter will never see it.
                                         .doOnError(TimeoutException.class, e -> log.info("<<< First attempt exceeded {}ms",
                                                                                          config.getBaseTimeout()))
                                         .doOnError(e -> !(e instanceof TimeoutException), e -> {
                                             log.info("<<< Error occurred in first attempt: {}", e.getMessage());
                                             log.debug("<<< Logging first attempt exception", e);
                                         });

                long curTimeout = (long) (config.getBaseTimeout() * config.getTimeoutScalingFactor());
                for (int i = 1; i < config.getMaxAttempts(); i++, curTimeout = (long) (curTimeout * config.getTimeoutScalingFactor())) {
                    final long finalCurTimeout = curTimeout;
                    final int attemptNumber = i + 1;
                    action = action
                            .onErrorResume(TimeoutException.class, e -> {
                                final Mono<ClientResponse> retryExchange = retry(exchange);
                                return retryExchange
                                        .flatMap(retryResponse -> copyClientResponseToExchangeResponse(exchange, retryResponse));
                            })
                            .timeout(Duration.ofMillis(curTimeout))
                            // Log this here because the logging filter will never see it.
                            .doOnError(TimeoutException.class, e -> log.info("<<< Retry attempt {} exceeded {}ms",
                                                                             attemptNumber,
                                                                             finalCurTimeout))
                            .doOnError(e -> !(e instanceof TimeoutException), e -> {
                                log.info("<<< Error occurred in {} attempt: {}", attemptNumber, e.getMessage());
                                log.debug(format("<<< Logging %d attempt exception", attemptNumber), e);
                            });
                }

                return action;
            } else {
                return chain.filter(exchange);
            }
        };
    }

    private Mono<? extends Void> copyClientResponseToExchangeResponse(ServerWebExchange exchange, ClientResponse retryResponse) {
        final ServerHttpResponse exchangeResponse = exchange.getResponse();
        exchangeResponse.setStatusCode(retryResponse.statusCode());
        exchangeResponse.getHeaders().clear();
        exchangeResponse.getHeaders()
                        .addAll(retryResponse.headers()
                                             .asHttpHeaders());
        return exchangeResponse.writeWith(retryResponse.bodyToMono(
                DataBuffer.class));
    }

    private Mono<ClientResponse> retry(ServerWebExchange exchange) {
        final ServerHttpRequest timedOutRequest = exchange.getRequest();
        log.info("Retrying request to {}", timedOutRequest.getURI());
        final URI damRequestUri = exchange.getAttribute(GATEWAY_REQUEST_URL_ATTR);

        final WebClient.RequestBodySpec bodySpec = webClient.method(timedOutRequest.getMethod())
                                                            .uri(damRequestUri);
        timedOutRequest.getHeaders()
                       .forEach((name, value) -> bodySpec.header(name,
                                                                 value.toArray(new String[0])));
        return bodySpec.body(timedOutRequest.getBody(),
                             DataBuffer.class)
                       .exchange();
    }

    @Data
    static class Config {
        /**
         * Maximum number of attempts (including first attempt).
         */
        private int maxAttempts = 2;
        /**
         * The timeout, in milliseconds, for the initial attempt.
         */
        private long baseTimeout = 1000;
        /**
         * Timeout for subsequent attempts scales exponentially with this base.
         */
        private double timeoutScalingFactor = 2.0;
        /**
         * HTTP methods on which this filter will enforce timeouts and retry.
         * Filter will not enforce timeout for other methods.
         */
        private List<HttpMethod> applicableMethods = Arrays.asList(GET, OPTIONS, HEAD);
    }
}
