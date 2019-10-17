package com.dnastack.ddap.common.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
@Slf4j
public class LoggingWebFilter implements WebFilter, Ordered {

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        final long startTime = System.currentTimeMillis();

        // Make sure logging request is part of the mono, so that if the request is retried
        // we will see it again in the logs
        return Mono.fromRunnable(() -> logRoutedRequest(exchange))
                   .then(chain.filter(exchange)
                              .doOnSuccess(value -> logResponse(exchange, startTime))
                              .doOnError(error -> logError(error, startTime))
                              .doOnTerminate(() -> logTermination(startTime)));
    }

    private void logRoutedRequest(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        URI calculatedRoute = calculateRequestRoute(exchange);
        log.info(">>> {} {}", request.getMethodValue(), calculatedRoute);
        exchange.getRequest()
                .getHeaders()
                .forEach((name, values) -> log.info("  {}: {}", name, values));
    }

    private URI calculateRequestRoute(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        URI requestUri = request.getURI();

        Route gatewayRoute = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        URI routeUri = gatewayRoute == null ? requestUri : gatewayRoute.getUri();

        return UriComponentsBuilder.fromUri(routeUri)
                                   .replacePath(requestUri.getPath())
                                   .replaceQuery(requestUri.getQuery())
                                   .build()
                                   .toUri();
    }

    private void logTermination(long startTime) {
        final long elapsedTime = System.currentTimeMillis() - startTime;
        log.debug("<<< Chain filter mono terminated in {}ms", elapsedTime);
    }

    private void logError(Throwable error, long startTime) {
        final long elapsedTime = System.currentTimeMillis() - startTime;
        log.info("<<< Error occurred in {}ms: {}", elapsedTime, error.getMessage());
        log.debug("<<< Error details", error);
    }

    private void logResponse(ServerWebExchange exchange, long startTime) {
        ServerHttpResponse response = exchange.getResponse();
        final long elapsedTime = System.currentTimeMillis() - startTime;
        log.info("<<< HTTP {}: {} bytes in {}ms",
                 response.getStatusCode(),
                 response.getHeaders().getContentLength(),
                 elapsedTime);
    }
}
