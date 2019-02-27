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

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static com.dnastack.ddapfrontend.security.UserTokenStatusFilter.extractDamToken;
import static java.lang.String.format;

@Slf4j
@Component
public class SetBearerTokenFromCookieGatewayFilterFactory extends AbstractGatewayFilterFactory {

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            final ServerHttpRequest request = exchange.getRequest();

            Optional<String> extractedToken = extractDamToken(request);

            if (extractedToken.isPresent()) {
                final String token = extractedToken.get();

                final ServerHttpRequest requestWithDamToken = request.mutate()
                        .header("Authorization", format("Bearer %s", token))
                        .build();

                return chain.filter(exchange.mutate()
                        .request(requestWithDamToken)
                        .build());
            } else {
                return chain.filter(exchange);
            }

        };
    }
}
