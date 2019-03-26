package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.ic.IdentityConcentratorClient;
import com.dnastack.ddapfrontend.client.ic.TokenExchangeException;
import com.dnastack.ddapfrontend.client.ic.TokenResponse;
import com.dnastack.ddapfrontend.security.OAuthStateHandler;
import com.dnastack.ddapfrontend.security.TokenExchangePurpose;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager.TokenAudience;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.dnastack.ddapfrontend.header.XForwardUtil.getExternalPath;
import static java.lang.String.format;
import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.http.HttpStatus.TEMPORARY_REDIRECT;

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

    @Autowired
    OAuthStateHandler stateHandler;

    @Value("${ddap.default-realm}")
    private String defaultRealm;

    /**
     * Returns the absolute URL that points to the {@link #apiLogin} controller method.
     *
     * @param request the current request (required for determining this service's hostname).
     * @param realm   the realm the returned URL should target.
     * @return Absolute URL of the URL an OAuth login flow should redirect to upon completion.
     */
    static URI rootLoginRedirectUrl(ServerHttpRequest request, String realm) {
        return URI.create(getExternalPath(request,
                format("/api/v1alpha/%s/identity/login", realm)));
    }

    @GetMapping("/login")
    public Mono<? extends ResponseEntity<?>> apiLogin(ServerHttpRequest request,
                                                      @PathVariable String realm,
                                                      @RequestParam(required = false) URI redirectUri,
                                                      @RequestParam(defaultValue = "ga4gh account_admin") String scope,
                                                      @RequestParam(required = false) String persona) {

        final String state = stateHandler.generateLoginState();

        if (persona != null) {
            log.debug("Performing direct persona login for {}", persona);
            return idpClient.personaLogin(realm, scope, persona)
                    .map(tokenResponse -> assembleTokenResponse(selfLinkToUi(request, realm, "data"), tokenResponse))
                    .doOnError(exception -> log.info("Failed to negotiate token", exception));

        } else {
            log.debug("Performing regular login (sending user to IC login page)");
            final URI postLoginTokenEndpoint;
            if (redirectUri != null) {
                postLoginTokenEndpoint = redirectUri;
                log.debug("Using client-provided redirectUri {}", postLoginTokenEndpoint);
            } else {
                postLoginTokenEndpoint = selfLinkToApi(request, realm, "identity/token");
                log.debug("Using calculated redirectUri {}", postLoginTokenEndpoint);
            }

            final URI loginUri = idpClient.getAuthorizeUrl(realm, state, scope, postLoginTokenEndpoint);
            log.debug("Redirecting to IdP login chooser page {}", loginUri);

            URI cookieDomainPath = selfLinkToApi(request, realm, "identity/token");
            ResponseEntity<Object> redirectToLoginPage = ResponseEntity.status(TEMPORARY_REDIRECT)
                    .location(loginUri)
                    .header(SET_COOKIE, cookiePackager.packageToken(state, cookieDomainPath.getHost(), TokenAudience.OAUTH_STATE).toString())
                    .build();
            return Mono.just(redirectToLoginPage);
        }
    }

    /**
     * Returns a fully-qualified URL pointing to a UI route in the given realm on this DDAP instance.
     *
     * @param request                 the inbound request from the user's browser (for calculating our return address)
     * @param realm                   the realm name to use in the returned URI
     * @param pathWithoutLeadingSlash the path component that comes after the realm. Must not begin with a slash.
     * @return absolute URI of the DDAP token endpoint for the given realm. Never null.
     */
    private static URI selfLinkToUi(ServerHttpRequest request, String realm, String pathWithoutLeadingSlash) {
        return URI.create(getExternalPath(request, format("/%s/%s", realm, pathWithoutLeadingSlash)));
    }

    /**
     * Returns a fully-qualified URL pointing to an API resource/endpoint in the given realm on this DDAP instance.
     *
     * @param request                 the inbound request from the user's browser (for calculating our return address)
     * @param realm                   the realm name to use in the returned URI
     * @param pathWithoutLeadingSlash the path component that comes after the realm. Must not begin with a slash.
     * @return absolute URI of the DDAP token endpoint for the given realm. Never null.
     */
    private static URI selfLinkToApi(ServerHttpRequest request, String realm, String pathWithoutLeadingSlash) {
        return URI.create(getExternalPath(request, format("/api/v1alpha/%s/%s", realm, pathWithoutLeadingSlash)));
    }

    /**
     * OAuth 2 token exchange endpoint for DDAP, which acts as an OAuth 2 client to the Identity Concentrator.
     * <p>
     * This method's purpose is to handle the two HTTP exchanges involved:
     * <ol>
     * <li>the inbound request from the client (usually initiated by a redirect following successful authentication
     * with Identity Concentrator)</li>
     * <li>the outbound request to the Identity Concentrator, to exchange the code for the auth tokens</li>
     * </ol>
     * </p>
     *
     * @return a redirect to the main UI along with some set-cookie headers that store the user's authentication
     * info for subsequent requests.
     */
    @GetMapping("/token")
    public Mono<? extends ResponseEntity<?>> handleTokenRequest(ServerHttpRequest request,
                                                                @PathVariable String realm,
                                                                @RequestParam String code,
                                                                @RequestParam("state") String stateParam,
                                                                @CookieValue("oauth_state") String stateFromCookie) {
        return idpClient.exchangeAuthorizationCodeForTokens(realm, rootLoginRedirectUrl(request, realm), code)
                .flatMap(tokenResponse -> {
                    TokenExchangePurpose tokenExchangePurpose = stateHandler.parseAndVerify(stateParam, stateFromCookie);
                    if (tokenExchangePurpose == TokenExchangePurpose.LOGIN) {
                        final URI ddapDataBrowserUrl = selfLinkToUi(request, realm, "data");
                        return Mono.just(assembleTokenResponse(ddapDataBrowserUrl, tokenResponse));
                    } else if (tokenExchangePurpose == TokenExchangePurpose.LINK) {
                        return finishAccountLinking(
                                request,
                                realm,
                                tokenResponse.getAccessToken(),
                                request.getCookies().getFirst("ic_token").getValue());
                    } else {
                        throw new TokenExchangeException("Unrecognized purpose in token exchange");
                    }
                })
                .doOnError(exception -> log.info("Failed to negotiate token", exception));
    }

    @GetMapping("/link")
    public Mono<? extends ResponseEntity<?>> initiateAccountLinking(
            ServerHttpRequest request,
            @PathVariable String realm,
            @RequestParam String provider,
            @RequestParam(defaultValue = "external_idp") AccountLinkingType type) {

        final Optional<String> icToken = cookiePackager.extractToken(request, UserTokenCookiePackager.TokenAudience.IC);
        if (!icToken.isPresent()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }

        final String targetAccountId = dangerousStopgapExtractSubject(icToken.get());
        if (targetAccountId == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is invalid"));
        }

        final String scopes = "account_admin link:" + targetAccountId;
        final String state = stateHandler.generateAccountLinkingState(targetAccountId);

        switch (type) {
            case EXTERNAL_IDP:
                final URI ddapTokenEndpoint = selfLinkToApi(request, realm, "identity/token");
                URI cookieDomainPath = selfLinkToApi(request, realm, "identity/token");
                return Mono.just(ResponseEntity.status(HttpStatus.TEMPORARY_REDIRECT)
                        .location(idpClient.getDirectLoginUrl(realm, state, scopes, ddapTokenEndpoint, provider))
                        .header(SET_COOKIE, cookiePackager.packageToken(state, cookieDomainPath.getHost(), TokenAudience.OAUTH_STATE).toString())
                        .build());
            case PERSONA:
                return idpClient.personaLogin(realm, scopes, provider)
                        .doOnError(exception -> log.info("Failed to negotiate persona token at beginning of account linking", exception))
                        .flatMap(tokenResponse -> finishAccountLinking(
                                request,
                                realm,
                                tokenResponse.getIdToken(),
                                request.getCookies().getFirst("ic_token").getValue()));
            default:
                return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unrecognized provider type"));
        }
    }

    private Mono<ResponseEntity<?>> finishAccountLinking(
            ServerHttpRequest request,
            String realm,
            String newAccountIdToken,
            String baseAccountIdToken) {
        String newAccountId = dangerousStopgapExtractSubject(newAccountIdToken);
        String baseAccountId = dangerousStopgapExtractSubject(baseAccountIdToken);

        return idpClient.linkAccounts(realm, baseAccountId, baseAccountIdToken, newAccountId, newAccountIdToken)
                .map(accountLinkResponse -> ResponseEntity.ok(accountLinkResponse));
    }

    private String dangerousStopgapExtractSubject(String jwt) {
        // FIXME [DISCO-1995] huge security hole! we must validate this token properly!
        final ObjectMapper objectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        final String[] jwtParts = jwt.split("\\.", -1);
        if (jwtParts.length != 3) {
            log.info("Treating malformed token cookie as missing ({} parts != 3)", jwtParts.length);
            return null;
        }

        final String jsonBody;
        try {
            jsonBody = new String(Base64.getUrlDecoder().decode(jwtParts[1]), StandardCharsets.UTF_8);
        } catch (IllegalArgumentException e) {
            log.info("Treating malformed token cookie as missing (couldn't base64 decode body)", e);
            return null;
        }

        final JwtSubject decodedBody;
        try {
            decodedBody = objectMapper.readValue(jsonBody, JwtSubject.class);
        } catch (IOException e) {
            log.info("Treating malformed token cookie as missing (couldn't JSON decode body)", e);
            return null;
        }

        log.debug("Decoded token {}", jsonBody);
        return decodedBody.getSub();
    }

    /**
     * Examines the result of an auth-code-for-token exchange with the Identity Concentrator and creates a response
     * which sets the appropriate cookies on the user's client and redirects it to the appropriate part of the UI.
     *
     * @param token the token response from the outbound request we initiated with the Identity Concentrator.
     * @return A response entity that sets the user's token cookies and redirects to the UI. Never null.
     */
    private ResponseEntity<?> assembleTokenResponse(URI redirectTo, TokenResponse token) {
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
            final String publicHost = redirectTo.getHost();
            final ResponseCookie damTokenCookie = cookiePackager.packageToken(token.getIdToken(), publicHost, TokenAudience.DAM);
            final ResponseCookie icTokenCookie = cookiePackager.packageToken(token.getAccessToken(), publicHost, TokenAudience.IC);
            return ResponseEntity.status(TEMPORARY_REDIRECT)
                    .location(redirectTo)
                    .header(SET_COOKIE, damTokenCookie.toString())
                    .header(SET_COOKIE, icTokenCookie.toString())
                    .build();
        }
    }

    /**
     * Makes account linking type case insensitive on the controller methods.
     */
    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {
        dataBinder.registerCustomEditor(AccountLinkingType.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) throws IllegalArgumentException {
                setValue(AccountLinkingType.valueOf(text.toUpperCase().replace('-', '_')));
            }
        });
    }

    enum AccountLinkingType {
        EXTERNAL_IDP, PERSONA
    }

    @Data
    private static class JwtSubject {
        String sub;
    }

}
