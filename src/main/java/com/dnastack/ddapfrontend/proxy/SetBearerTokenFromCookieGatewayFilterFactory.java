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

import com.dnastack.ddapfrontend.header.XForwardUtil;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

import static java.lang.String.format;

@Slf4j
@Component
public class SetBearerTokenFromCookieGatewayFilterFactory extends AbstractGatewayFilterFactory {

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            final ServerHttpRequest request = exchange.getRequest();
            final ServerHttpResponse response = exchange.getResponse();

            Optional<String> extractedToken = extractDamToken(request);

            if (extractedToken.isPresent()) {
                final String token = extractedToken.get();

                final ServerHttpRequest requestWithDamToken = request.mutate()
                        .header("Authorization", format("Bearer %s", token))
                        .build();

                if (isTokenExpired(token)) {
                    log.info("Clearing expired token cookie");
                    final String requestUrl = XForwardUtil.getExternalPath(request, "/");
                    final String cookieHost = URI.create(requestUrl).getHost();

                    // Side effect! This adds a set-cookie header to the response.
                    response.addCookie(clearDamToken(cookieHost));
                }

                return chain.filter(exchange.mutate()
                        .request(requestWithDamToken)
                        .build());
            } else {
                return chain.filter(exchange);
            }

        };
    }

    private static boolean isTokenExpired(String token) {
        String[] jwtParts = token.split("\\.", -1);
        if (jwtParts.length != 3) {
            log.info("Treating malformed token cookie as expired ({} parts != 3", jwtParts.length);
            return true;
        }

        String jsonBody;
        try {
            jsonBody = new String(Base64.getUrlDecoder().decode(jwtParts[1]), StandardCharsets.UTF_8);
        } catch (IllegalArgumentException e) {
            log.info("Treating malformed token cookie as expired (couldn't base64 decode body)", e);
            return true;
        }

        JwtExpiration decodedBody;
        try {
            decodedBody = objectMapper.readValue(jsonBody, JwtExpiration.class);
        } catch (IOException e) {
            log.info("Treating malformed token cookie as expired (couldn't JSON decode body)", e);
            return true;
        }

        return decodedBody.getExp() < Instant.now().getEpochSecond();
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

    /**
     * Encrypts the given token, which is valid authorization to call in to the DAM, and returns the result
     * as a cookie to be set for the given hostname.
     *
     * @param token The token as usable for calling DAM
     * @param cookieHost The host the returned cookie should target. Should usually point to this DDAP server, since we
     *                  are the only ones who can decrypt the cookie's contents.
     * @return a cookie that should be sent to the user's browser.
     */
    public static ResponseCookie packageDamToken(String token, String cookieHost) {
        return ResponseCookie.from("user_token", token)
                .domain(cookieHost)
                .path("/")
                .build();
    }

    /**
     * Produces a cookie that, when set for the given hostname, clears the user's DAM authorization.
     *
     * @param cookieHost The host the returned cookie should target. Should usually point to this DDAP server, and
     *                   should match the cookieHost passed to {@link #packageDamToken(String, String)} on a previous
     *                   request.
     * @return a cookie that should be sent to the user's browser to clear their DAM token.
     */
    public static ResponseCookie clearDamToken(String cookieHost) {
        return ResponseCookie.from("user_token", "expired")
                .domain(cookieHost)
                .path("/")
                .maxAge(Duration.ZERO)
                .build();
    }

    @Data
    private static class JwtExpiration {
        long exp;
    }
}
