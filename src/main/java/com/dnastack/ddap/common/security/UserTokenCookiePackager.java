package com.dnastack.ddap.common.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserTokenCookiePackager {

    /**
     * To allow local development without HTTPS, marking cookies as secure is a configurable option.
     */
    @Value("${ddap.cookies.secure}")
    private boolean generateSecureCookies;

    /**
     * Extracts a security token from the given request, which carries it in an encrypted cookie.
     *
     * @param request the request that originated from the user and probably contains the encrypted DAM token.
     * @param audience The collaborating service that honours the token.
     * @return A string that can be used as a bearer token in a request to DAM, or {@code Optional.empty}
     * if the given request doesn't contain a usable token.
     */
    public Optional<String> extractToken(ServerHttpRequest request, CookieKind audience) {
        return Optional.ofNullable(request.getCookies().getFirst(audience.cookieName()))
                .map(HttpCookie::getValue);
    }

    public String extractRequiredToken(ServerHttpRequest request, CookieKind audience) {
        return extractToken(request, audience)
                .orElseThrow(() -> new AuthCookieNotPresentInRequestException(audience.cookieName()));
    }

    public Map<CookieKind, String> extractRequiredTokens(ServerHttpRequest request, Set<CookieKind> audiences) {
        return audiences.stream()
                .map(audience -> Map.entry(audience, extractRequiredToken(request, audience)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * Encrypts the given security token, and returns the result as a cookie to be set for the given hostname.
     *
     * @param token The token as usable for calling the IC account info endpoints.
     * @param cookieHost The host the returned cookie should target. Should usually point to this DDAP server, since we
     *                  are the only ones who can decrypt the cookie's contents.
     * @param audience The collaborating service that honours the token.
     * @return a cookie that should be sent to the user's browser.
     */
    public ResponseCookie packageToken(String token, String cookieHost, CookieKind audience) {
        return ResponseCookie.from(audience.cookieName(), token)
                .domain(cookieHost)
                .path("/")
                .secure(generateSecureCookies)
                .httpOnly(true)
                .build();
    }

    public ResponseCookie packageToken(String token, CookieKind audience) {
        return ResponseCookie.from(audience.cookieName(), token)
                .path("/")
                .secure(generateSecureCookies)
                .httpOnly(true)
                .build();
    }

    /**
     * Produces a cookie that, when set for the given hostname, clears the corresponding security authorization.
     *
     * @param cookieHost The host the returned cookie should target. Should usually point to this DDAP server, and
     *                   should match the cookieHost passed to {@link #packageToken} on a previous request.
     * @return a cookie that should be sent to the user's browser to clear their DAM token.
     */
    public ResponseCookie clearToken(String cookieHost, CookieKind audience) {
        return ResponseCookie.from(audience.cookieName(), "expired")
                .domain(cookieHost)
                .path("/")
                .maxAge(Duration.ZERO)
                .build();
    }

    public enum CookieKind {
        IC("ic_token"),
        DAM("dam_token"),
        REFRESH("refresh_token"),
        OAUTH_STATE("oauth_state");

        private String cookieName;

        CookieKind(String cookieName) {
            this.cookieName = cookieName;
        }

        public String cookieName() {
            return cookieName;
        }
    }

}
