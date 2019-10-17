package com.dnastack.ddap.common.security.filter;

import com.dnastack.ddap.common.util.http.XForwardUtil;
import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final UserTokenCookiePackager cookiePackager;

    @Autowired
    public UserTokenStatusFilter(UserTokenCookiePackager cookiePackager) {
        this.cookiePackager = cookiePackager;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        final ServerHttpRequest originalRequest = exchange.getRequest();
        final ServerHttpResponse mutableResponse = exchange.getResponse();

        Optional<String> extractedToken = cookiePackager.extractToken(originalRequest, CookieKind.DAM);
        boolean haveValidAuth;

        if (extractedToken.isPresent()) {
            final String token = extractedToken.get();

            if (isJwtTokenExpired(token)) {
                log.info("Clearing expired token cookie");
                final String requestUrl = XForwardUtil.getExternalPath(originalRequest, "/");
                final String cookieHost = URI.create(requestUrl).getHost();
                mutableResponse.addCookie(cookiePackager.clearToken(cookieHost, CookieKind.DAM));
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


    private static boolean isJwtTokenExpired(String token) {
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

    @Data
    private static class JwtExpiration {
        long exp;
    }

}
