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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;

/**
 * Logs requests and responses going through the gateway.
 */
@Component
public class LoggingGatewayFilterFactory extends AbstractGatewayFilterFactory {

	private static final Logger log = LoggerFactory.getLogger(LoggingGatewayFilterFactory.class);
	private static final URI UNKNOWN_ROUTE_PLACEHOLDER = URI.create("http://unknown-route/");

	@Override
	public GatewayFilter apply(Object config) {
		return (exchange, chain) -> {
			logRoutedRequest(exchange);
			final long startTime = System.currentTimeMillis();
			return chain.filter(exchange).then(Mono.fromRunnable(() -> logResponse(exchange, startTime)));
		};
	}

	private void logRoutedRequest(ServerWebExchange exchange) {
		ServerHttpRequest request = exchange.getRequest();
		URI requestUri = request.getURI();

		Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
		URI routeUri = route == null ? UNKNOWN_ROUTE_PLACEHOLDER : route.getUri();

		String requestPathAndQuery = requestUri.getPath() + requestUri.getQuery();
		URI calculatedRoute = routeUri.resolve(requestPathAndQuery);
		log.info(">>> {} {}", request.getMethodValue(), calculatedRoute);
	}

	private void logResponse(ServerWebExchange exchange, long startTime) {
		ServerHttpResponse response = exchange.getResponse();
		final long elapsedTime = System.currentTimeMillis() - startTime;
		log.info("<<< HTTP {}: {} bytes in {}ms", response.getStatusCode(), response.getHeaders().getContentLength(), elapsedTime);
	}
}
