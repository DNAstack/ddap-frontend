package com.dnastack.ddapfrontend.security;

import com.dnastack.ddapfrontend.header.XForwardUtil;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

/**
 * Inspects every inbound request and affects the response in the following two ways:
 * <ol>
 * <li>Adds a {@code x-ddap-auth-valid: {true|false}} response header indicating whether or not a valid user token
 * was presented with the request</li>
 * <li>If the user's auth token is malformed, stale-dated, or has a bad signature, adds a {@code set-cookie} header
 * that removes the cookie carrying the user's auth token</li>
 * </ol>
 */
@Slf4j
@Component
public class UserTokenStatusFilter implements WebFilter {

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        final ServerHttpRequest originalRequest = exchange.getRequest();
        final ServerHttpResponse mutableResponse = exchange.getResponse();

        Optional<String> extractedToken = extractDamToken(originalRequest);
        boolean haveValidAuth;

        if (extractedToken.isPresent()) {
            final String token = extractedToken.get();

            if (isTokenExpired(token)) {
                log.info("Clearing expired token cookie");
                final String requestUrl = XForwardUtil.getExternalPath(originalRequest, "/");
                final String cookieHost = URI.create(requestUrl).getHost();
                mutableResponse.addCookie(clearDamToken(cookieHost));
                haveValidAuth = false;
            } else {
                haveValidAuth = true;
            }

        } else {
            haveValidAuth = false;
        }

        mutableResponse.getHeaders().add("X-DDAP-Authenticated", Boolean.toString(haveValidAuth));

        return chain.filter(exchange);
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
     * @param token      The token as usable for calling DAM
     * @param cookieHost The host the returned cookie should target. Should usually point to this DDAP server, since we
     *                   are the only ones who can decrypt the cookie's contents.
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
