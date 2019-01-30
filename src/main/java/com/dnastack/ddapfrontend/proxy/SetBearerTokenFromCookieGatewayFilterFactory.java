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

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static java.lang.String.format;

@Component
public class SetBearerTokenFromCookieGatewayFilterFactory extends AbstractGatewayFilterFactory {

	@Override
	public GatewayFilter apply(Object config) {
		return (exchange, chain) -> {
			final ServerHttpRequest request = exchange.getRequest();
			final Optional<HttpCookie> foundCookie = Optional.ofNullable(request.getCookies()
																				   .getFirst("user_token"));
			foundCookie.map(cookie -> cookie.getValue())
					   .ifPresent(token -> request.mutate()
												  .header("Authorization", format("Bearer %s", token))
												  .path("/")
												  .build());

			return chain.filter(exchange);
		};
	}
}
