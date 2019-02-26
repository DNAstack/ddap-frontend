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
            Optional<ServerHttpRequest> requestWithDamToken = extractDamToken(request)
                    .map(token -> request.mutate()
                            .header("Authorization", format("Bearer %s", token))
                            .build());

            return chain.filter(exchange.mutate().request(requestWithDamToken.orElse(request)).build());
        };
    }

    /**
     * Extracts the user's DAM authorization token from the given request, which carries it in an
     * encrypted cookie.
     *
     * @param request the request that originated from the user and probably contains the encrypted DAM token.
     * @return A string that can be used as a bearer token in a request to DAM, or {@code Optional.empty}
     * if the given request doesn't contain a usable token.
     */
    public static Optional<String> extractDamToken(ServerHttpRequest request) {
        return Optional.ofNullable(request.getCookies().getFirst("user_token"))
                .map(HttpCookie::getValue);
    }
}
