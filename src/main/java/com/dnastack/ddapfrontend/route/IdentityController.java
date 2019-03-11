package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.ic.IdentityConcentratorClient;
import com.dnastack.ddapfrontend.client.ic.TokenResponse;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager.TokenAudience;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashSet;
import java.util.Set;

import static com.dnastack.ddapfrontend.header.XForwardUtil.getExternalPath;
import static java.lang.String.format;
import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.http.HttpStatus.TEMPORARY_REDIRECT;
import static org.springframework.http.MediaType.TEXT_PLAIN;

/**
 * Provides endpoints that start and finish the OAauth 2 / OIDC login process. Upon successful login, the user
 * is redirected to the UI in a response that also sets up auth cookies that give them access to the rest of the
 * DDAP.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/identity")
public class IdentityController {

    @Autowired
    private IdentityConcentratorClient idpClient;

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @Value("${ddap.default-realm}")
    private String defaultRealm;

    /**
     * Returns the absolute URL that points to the {@link #apiLogin} controller method.
     *
     * @param request the current request (required for determining this service's hostname).
     * @param realm the realm the returned URL should target.
     * @return Absolute URL of the URL an OAuth login flow should redirect to upon completion.
     */
    static URI rootLoginRedirectUrl(ServerHttpRequest request, String realm) {
        return URI.create(getExternalPath(request,
                format("/api/v1alpha/%s/identity/login", realm)));
    }

    @GetMapping("/login")
    public ResponseEntity<?> apiLogin(ServerHttpRequest request,
                                      @PathVariable String realm,
                                      @RequestParam(required = false) URI redirectUri,
                                      @RequestParam(required = false) String persona) {

        // where to go first (to log in)
        final URI redirectTarget;

        // where to go after the login has completed
        final URI finalDestination;
        if (redirectUri != null) {
            finalDestination = redirectUri;
        } else {
            finalDestination = absoluteDdapTokenUri(request, realm);
        }

        if (persona != null) {
            URI personaLoginUrl = idpClient.getPersonaLoginUrl(finalDestination, realm, persona);
            redirectTarget = personaLoginUrl;
            log.debug("Redirecting to persona login IC endpoint {}", personaLoginUrl);
        } else {
            redirectTarget = idpClient.getAuthorizeUrl(finalDestination, realm);
            log.debug("Redirecting to IdP login chooser page {}", redirectTarget);
        }

        return ResponseEntity.status(TEMPORARY_REDIRECT)
                .location(redirectTarget)
                .build();
    }

    /**
     * OAuth 2 token exchange endpoint for DDAP.
     *
     * @return a redirect to the main UI along with some set-cookie headers that store the user's authentication
     * info for subsequent requests.
     */
    @GetMapping("/token")
    public Mono<? extends ResponseEntity<?>> handleTokenRequest(ServerHttpRequest request,
                                                @PathVariable String realm,
                                                @RequestParam(required = false) String code) {
        if (code != null) {
            return idpClient.exchangeAuthorizationCodeForTokens(realm, rootLoginRedirectUrl(request, realm), code)
                    .map(tokenResponse -> createTokenResponse(request, realm, tokenResponse))
                    .doOnError(exception -> log.info("Failed to negotiate token", exception));
        } else {
            return Mono.just(ResponseEntity.badRequest().contentType(TEXT_PLAIN)
                    .body("Token request requires 'code' parameter."));
        }
    }

    /**
     * Returns the fully-qualified OAuth 2 token endpoint of the given realm on this DDAP instance (the URL for the
     * {@link #handleTokenRequest(ServerHttpRequest, String, String)} method.
     *
     * @param request the inbound request from the user's browser (for calculating our return address)
     * @param realm the realm name to use in the returned URI
     * @return absolute URI of the DDAP token endpoint for the given realm. Never null.
     */
    private URI absoluteDdapTokenUri(ServerHttpRequest request, String realm) {
        return URI.create(getExternalPath(request, format("/api/v1alpha/%s/identity/token", realm)));
    }

    /**
     * Creates a response which sets the appropriate cookies on the user's client and redirects it to the data browser
     * UI.
     *
     * @param request the inbound request from the user's browser (for calculating our return address)
     * @param realm the realm name to use in the redirect-to-UI
     * @return A response entity that sets the user's token cookies and redirects to the UI. Never null.
     */
    private ResponseEntity<?> createTokenResponse(ServerHttpRequest request, String realm, TokenResponse token) {
        Set<String> missingItems = new HashSet<>();
        if (token == null) {
            missingItems.add("token");
        } else {
            if (token.getAccessToken() == null) {
                missingItems.add("access_token");
            }
            if (token.getIdToken() == null) {
                missingItems.add("id_token");
            }
        }

        if (!missingItems.isEmpty()) {
            throw new IllegalArgumentException("Incomplete token response: missing " + missingItems);
        } else {
            final URI redirectUri = URI.create(getExternalPath(request, format("/%s/data", realm)));
            final String publicHost = redirectUri.getHost();
            final ResponseCookie damTokenCookie = cookiePackager.packageToken(token.getIdToken(), publicHost, TokenAudience.DAM);
            final ResponseCookie icTokenCookie = cookiePackager.packageToken(token.getAccessToken(), publicHost, TokenAudience.IC);
            return ResponseEntity.status(TEMPORARY_REDIRECT)
                    .location(redirectUri)
                    .header(SET_COOKIE, damTokenCookie.toString())
                    .header(SET_COOKIE, icTokenCookie.toString())
                    .build();
        }
    }
}
