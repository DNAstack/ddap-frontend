package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.AuthAccessTesterClient;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.ic.IcAccount;
import com.dnastack.ddapfrontend.client.ic.ReactiveIcClient;
import com.dnastack.ddapfrontend.client.ic.TokenExchangeException;
import com.dnastack.ddapfrontend.client.ic.TokenResponse;
import com.dnastack.ddapfrontend.config.ProfileService;
import com.dnastack.ddapfrontend.http.UriUtil;
import com.dnastack.ddapfrontend.model.IdentityModel;
import com.dnastack.ddapfrontend.security.OAuthStateHandler;
import com.dnastack.ddapfrontend.security.TokenExchangePurpose;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager.CookieKind;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static com.dnastack.ddapfrontend.http.UriUtil.selfLinkToApi;
import static com.dnastack.ddapfrontend.http.XForwardUtil.getExternalPath;
import static java.lang.String.format;
import static java.util.Arrays.asList;
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

    private static final String DEFAULT_SCOPES = "openid ga4gh account_admin identities";

    @Autowired
    private ReactiveDamClient damClient;

    @Autowired
    private ReactiveIcClient idpClient;
    @Autowired
    private UserTokenCookiePackager cookiePackager;
    @Autowired
    private OAuthStateHandler stateHandler;
    @Autowired
    private AuthAccessTesterClient accessTesterClient;
    @Autowired
    private ProfileService profileService;

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

    @GetMapping
    public Mono<? extends ResponseEntity<?>> getIdentity(ServerHttpRequest request, @PathVariable String realm) {
        Optional<String> icToken = cookiePackager.extractToken(request, CookieKind.IC);
        Optional<String> damToken = cookiePackager.extractToken(request, CookieKind.DAM);
        if (icToken.isEmpty() || damToken.isEmpty()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }

        Mono<List<IdentityModel.Access>> accessesMono = accessTesterClient.determineAccessForUser(realm, damToken.get(), icToken.get());
        Mono<IcAccount> accountMono = idpClient.getAccounts(realm, icToken.get());

        return Mono.zip(accessesMono, accountMono, (accesses, account) -> {
            Optional<JwtSubject> subject = dangerousStopgapExtractSubject(icToken.get());
            return IdentityModel.builder()
                    .account(account.getAccount())
                    .scopes(subject.get().scope)
                    .accesses(accesses)
                    .sandbox(profileService.isSandboxProfileActive())
                    .build();
        }).flatMap(account -> Mono.just(ResponseEntity.ok().body(account)));
    }

    @GetMapping("/login")
    public Mono<? extends ResponseEntity<?>> apiLogin(ServerHttpRequest request,
                                                      @PathVariable String realm,
                                                      @RequestParam(required = false) URI redirectUri,
                                                      @RequestParam(defaultValue = DEFAULT_SCOPES) String scope,
                                                      @RequestParam(required = false) String loginHint,
                                                      @RequestParam(required = false) String persona) {

        final String state = stateHandler.generateLoginState(redirectUri);

        if (persona != null) {
            log.debug("Performing direct persona login for {}", persona);
            return idpClient.personaLogin(realm, scope, persona, selfLinkToApi(request, realm, ""))
                    .map(tokenResponse -> assembleTokenResponse(UriUtil.selfLinkToUi(request, realm, "data"), tokenResponse))
                    .doOnError(exception -> log.info("Failed to negotiate token", exception));

        } else {
            final URI postLoginTokenEndpoint = selfLinkToApi(request, realm, "identity/token");
            final URI loginUri = idpClient.getAuthorizeUrl(realm, state, scope, postLoginTokenEndpoint, loginHint);
            log.debug("Redirecting to IdP login chooser page {}", loginUri);

            URI cookieDomainPath = selfLinkToApi(request, realm, "identity/token");
            ResponseEntity<Object> redirectToLoginPage = ResponseEntity.status(TEMPORARY_REDIRECT)
                    .location(loginUri)
                    .header(SET_COOKIE, cookiePackager.packageToken(state, cookieDomainPath.getHost(), CookieKind.OAUTH_STATE).toString())
                    .build();
            return Mono.just(redirectToLoginPage);
        }
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
                    Optional<URI> customDestination = stateHandler.getDestinationAfterLogin(stateParam)
                            .map(possiblyRelativeUrl -> UriUtil.selfLinkToUi(request, realm, "").resolve(possiblyRelativeUrl));
                    if (tokenExchangePurpose == TokenExchangePurpose.LOGIN) {
                        final URI ddapDataBrowserUrl = customDestination.orElseGet(() -> UriUtil.selfLinkToUi(request, realm, "data"));
                        return Mono.just(assembleTokenResponse(ddapDataBrowserUrl, tokenResponse));
                    } else if (tokenExchangePurpose == TokenExchangePurpose.LINK) {
                        return finishAccountLinking(
                                request, tokenResponse.getAccessToken(), request.getCookies().getFirst("ic_token").getValue(), realm
                        ).map(success -> ResponseEntity.status(307).location(UriUtil.selfLinkToUi(request, realm, "identity")).build());
                    } else {
                        throw new TokenExchangeException("Unrecognized purpose in token exchange");
                    }
                })
                .doOnError(exception -> log.info("Failed to negotiate token", exception));
    }

    @DeleteMapping(value = "/link/{subjectName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<? extends ResponseEntity<?>> unlinkAccount(
            ServerHttpRequest request,
            @PathVariable String realm,
            @PathVariable String subjectName) {
        final Optional<String> icToken = cookiePackager.extractToken(request, CookieKind.IC);
        if (icToken.isEmpty()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }
        final Optional<String> refreshToken = cookiePackager.extractToken(request, CookieKind.REFRESH);
        if (refreshToken.isEmpty()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }
        final String targetAccountId = dangerousStopgapExtractSubject(icToken.get()).map(JwtSubject::getSub).orElse(null);
        if (targetAccountId == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is invalid"));
        }

        final String accountId = dangerousStopgapExtractSubject(icToken.get()).map(JwtSubject::getSub).orElse(null);

        Mono<String> unlinkAccountMono = idpClient.unlinkAccount(realm, accountId, icToken.get(), subjectName);
        Mono<TokenResponse> refreshAccessTokenMono = idpClient.refreshAccessToken(realm, refreshToken.get());

        return unlinkAccountMono.then(refreshAccessTokenMono).flatMap((tokenResponse) -> {
            URI cookieDomainPath = selfLinkToApi(request, realm, "identity/token");
            return Mono.just(ResponseEntity.status(200)
                    .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getAccessToken(), cookieDomainPath.getHost(), CookieKind.IC).toString())
                    .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getIdToken(), cookieDomainPath.getHost(), CookieKind.DAM).toString())
                    .build());
        });
    }

    @GetMapping("/refresh")
    public Mono<? extends ResponseEntity<?>> refresh(ServerHttpRequest request, @PathVariable String realm) {
        final Optional<String> refreshToken = cookiePackager.extractToken(request, CookieKind.REFRESH);
        if (refreshToken.isEmpty()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }

        URI cookieDomainPath = selfLinkToApi(request, realm, "identity/token");
        Mono<TokenResponse> refreshAccessTokenMono = idpClient.refreshAccessToken(realm, refreshToken.get());

        return refreshAccessTokenMono.map((tokenResponse) -> ResponseEntity.noContent()
                .location(UriUtil.selfLinkToUi(request, realm, "identity"))
                .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getAccessToken(), cookieDomainPath.getHost(), CookieKind.IC).toString())
                .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getIdToken(), cookieDomainPath.getHost(), CookieKind.DAM).toString())
                .build());
    }

    @GetMapping("/link")
    public Mono<? extends ResponseEntity<?>> initiateAccountLinking(
            ServerHttpRequest request,
            @PathVariable String realm,
            @RequestParam String provider,
            @RequestParam(defaultValue = "external_idp") AccountLinkingType type) {

        final Optional<String> icToken = cookiePackager.extractToken(request, CookieKind.IC);
        if (icToken.isEmpty()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }
        final Optional<String> refreshToken = cookiePackager.extractToken(request, CookieKind.REFRESH);
        if (refreshToken.isEmpty()) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is required"));
        }
        final String targetAccountId = dangerousStopgapExtractSubject(icToken.get()).map(JwtSubject::getSub).orElse(null);
        if (targetAccountId == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is invalid"));
        }

        final String scopes = format("%s link:%s", DEFAULT_SCOPES, targetAccountId);
        final String state = stateHandler.generateAccountLinkingState(targetAccountId);
        URI cookieDomainPath = selfLinkToApi(request, realm, "identity/token");

        switch (type) {
            case EXTERNAL_IDP:
                final URI ddapTokenEndpoint = selfLinkToApi(request, realm, "identity/token");
                return Mono.just(ResponseEntity.status(HttpStatus.TEMPORARY_REDIRECT)
                        .location(idpClient.getDirectLoginUrl(realm, state, scopes, ddapTokenEndpoint, provider))
                        .header(SET_COOKIE, cookiePackager.packageToken(state, cookieDomainPath.getHost(), CookieKind.OAUTH_STATE).toString())
                        .build());
            case PERSONA:
                Mono<TokenResponse> refreshAccessTokenMono = idpClient.refreshAccessToken(realm, refreshToken.get());
                Mono<String> linkAccountMono = idpClient.personaLogin(realm, scopes, provider, selfLinkToApi(request, realm, ""))
                        .doOnError(exception -> log.info("Failed to negotiate persona token at beginning of account linking", exception))
                        .flatMap(tokenResponse -> finishAccountLinking(
                                request, tokenResponse.getAccessToken(), request.getCookies().getFirst("ic_token").getValue(), realm
                        ));
                return linkAccountMono.then(refreshAccessTokenMono).flatMap((tokenResponse) -> Mono.just(ResponseEntity.status(307)
                        .location(UriUtil.selfLinkToUi(request, realm, "identity"))
                        .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getAccessToken(), cookieDomainPath.getHost(), CookieKind.IC).toString())
                        .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getIdToken(), cookieDomainPath.getHost(), CookieKind.DAM).toString())
                        .build()));
            default:
                return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unrecognized provider type"));
        }
    }

    private Mono<String> finishAccountLinking(
            ServerHttpRequest request, String newAccountLinkToken, String baseAccountLinkToken, String realm) {
        String newAccountId = dangerousStopgapExtractSubject(newAccountLinkToken).map(JwtSubject::getSub).orElse(null);
        String baseAccountId = dangerousStopgapExtractSubject(baseAccountLinkToken).map(JwtSubject::getSub).orElse(null);

        return idpClient.linkAccounts(realm, baseAccountId, baseAccountLinkToken, newAccountId, newAccountLinkToken);
    }

    private String dangerousStopgapParseToken(String jwt) {
        // FIXME [DISCO-1995] huge security hole! we must validate this token properly!
        final String[] jwtParts = jwt.split("\\.", -1);
        if (jwtParts.length != 3) {
            log.info("Treating malformed token cookie as missing ({} parts != 3)", jwtParts.length);
            return null;
        }

        try {
            return new String(Base64.getUrlDecoder().decode(jwtParts[1]), StandardCharsets.UTF_8);
        } catch (IllegalArgumentException e) {
            log.info("Treating malformed token cookie as missing (couldn't base64 decode body)", e);
            return null;
        }
    }

    private Optional<JwtSubject> dangerousStopgapExtractSubject(String jwt) {
        String jsonBody = dangerousStopgapParseToken(jwt);
        final ObjectMapper objectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        final JwtSubject decodedBody;
        try {
            decodedBody = objectMapper.readValue(jsonBody, JwtSubject.class);
        } catch (IOException e) {
            log.info("Treating malformed token cookie as missing (couldn't JSON decode body)", e);
            return Optional.empty();
        }

        log.debug("Decoded token {}", jsonBody);
        return Optional.of(decodedBody);
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
            final ResponseCookie damTokenCookie = cookiePackager.packageToken(token.getIdToken(), publicHost, CookieKind.DAM);
            final ResponseCookie icTokenCookie = cookiePackager.packageToken(token.getAccessToken(), publicHost, CookieKind.IC);
            final ResponseCookie refreshTokenCookie = cookiePackager.packageToken(token.getRefreshToken(), publicHost, CookieKind.REFRESH);
            return ResponseEntity.status(TEMPORARY_REDIRECT)
                    .location(redirectTo)
                    .header(SET_COOKIE, damTokenCookie.toString())
                    .header(SET_COOKIE, icTokenCookie.toString())
                    .header(SET_COOKIE, refreshTokenCookie.toString())
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
        List<String> scope;

        @JsonSetter
        public void setScope(String scope) {
            this.scope = asList(scope.split(" "));
        }
    }

}
