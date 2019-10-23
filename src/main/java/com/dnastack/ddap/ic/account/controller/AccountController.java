package com.dnastack.ddap.ic.account.controller;

import com.dnastack.ddap.common.config.ProfileService;
import com.dnastack.ddap.common.security.OAuthStateHandler;
import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;
import com.dnastack.ddap.common.util.http.UriUtil;
import com.dnastack.ddap.ic.account.client.ReactiveIcAccountClient;
import com.dnastack.ddap.ic.account.model.AccountLinkingType;
import com.dnastack.ddap.ic.account.model.IdentityModel;
import com.dnastack.ddap.ic.account.service.AccountLinkingService;
import com.dnastack.ddap.ic.common.security.JwtUtil;
import com.dnastack.ddap.ic.oauth.client.ReactiveOAuthClient;
import com.dnastack.ddap.ic.oauth.model.TokenResponse;
import ic.v1.IcService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.beans.PropertyEditorSupport;
import java.net.URI;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.lang.String.format;
import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/identity")
public class AccountController {

    private static final String DEFAULT_SCOPES = "openid ga4gh_passport_v1 account_admin identities";

    private ReactiveOAuthClient oAuthClient;
    private ReactiveIcAccountClient idpClient;
    private UserTokenCookiePackager cookiePackager;
    private OAuthStateHandler stateHandler;
    private ProfileService profileService;
    private AccountLinkingService accountLinkingService;

    @Autowired
    public AccountController(ReactiveOAuthClient oAuthClient,
                             ReactiveIcAccountClient idpClient,
                             UserTokenCookiePackager cookiePackager,
                             OAuthStateHandler stateHandler,
                             ProfileService profileService,
                             AccountLinkingService accountLinkingService) {
        this.oAuthClient = oAuthClient;
        this.idpClient = idpClient;
        this.cookiePackager = cookiePackager;
        this.stateHandler = stateHandler;
        this.profileService = profileService;
        this.accountLinkingService = accountLinkingService;
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

    @GetMapping
    public Mono<? extends ResponseEntity<?>> getIdentity(ServerHttpRequest request, @PathVariable String realm) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.IC, CookieKind.DAM, CookieKind.REFRESH));

        Mono<IcService.AccountResponse> accountMono = idpClient.getAccounts(realm, tokens);

        return accountMono.map(account -> {
            Optional<JwtUtil.JwtSubject> subject = JwtUtil.dangerousStopgapExtractSubject(tokens.get(CookieKind.IC));
            return IdentityModel.builder()
                    .account(account.getAccount())
                    .scopes(subject.get().getScope())
                    .sandbox(profileService.isSandboxProfileActive())
                    .build();
        }).flatMap(account -> Mono.just(ResponseEntity.ok().body(account)));
    }

    @DeleteMapping(value = "/link/{subjectName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<? extends ResponseEntity<?>> unlinkAccount(ServerHttpRequest request,
                                                           @PathVariable String realm,
                                                           @PathVariable String subjectName) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.IC, CookieKind.REFRESH));
        final String targetAccountId = JwtUtil.dangerousStopgapExtractSubject(tokens.get(CookieKind.IC)).map(JwtUtil.JwtSubject::getSub).orElse(null);
        if (targetAccountId == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is invalid"));
        }

        Mono<String> unlinkAccountMono = accountLinkingService.unlinkAccount(realm, tokens, subjectName);
        Mono<TokenResponse> refreshAccessTokenMono = oAuthClient.refreshAccessToken(realm, tokens.get(CookieKind.REFRESH));

        return unlinkAccountMono.then(refreshAccessTokenMono)
                .flatMap((tokenResponse) -> {
                    URI cookieDomainPath = UriUtil.selfLinkToApi(request, realm, "identity/token");
                    return Mono.just(ResponseEntity.status(200)
                            .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getAccessToken(), cookieDomainPath.getHost(), CookieKind.IC).toString())
                            .header(SET_COOKIE, cookiePackager.packageToken(tokenResponse.getIdToken(), cookieDomainPath.getHost(), CookieKind.DAM).toString())
                            .build());
                });
    }

    @GetMapping("/link")
    public Mono<? extends ResponseEntity<?>> initiateAccountLinking(ServerHttpRequest request,
                                                                    @PathVariable String realm,
                                                                    @RequestParam String provider,
                                                                    @RequestParam(defaultValue = "external_idp") AccountLinkingType type) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.IC, CookieKind.REFRESH));
        final String targetAccountId = JwtUtil.dangerousStopgapExtractSubject(tokens.get(CookieKind.IC)).map(JwtUtil.JwtSubject::getSub).orElse(null);
        if (targetAccountId == null) {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization is invalid"));
        }

        final String scopes = format("%s link:%s", DEFAULT_SCOPES, targetAccountId);
        final String state = stateHandler.generateAccountLinkingState(targetAccountId);
        URI cookieDomainPath = UriUtil.selfLinkToApi(request, realm, "identity/token");

        switch (type) {
            case EXTERNAL_IDP:
                final URI ddapTokenEndpoint = UriUtil.selfLinkToApi(request, realm, "identity/token");
                return Mono.just(ResponseEntity.status(HttpStatus.TEMPORARY_REDIRECT)
                        .location(oAuthClient.getDirectLoginUrl(realm, state, scopes, ddapTokenEndpoint, provider))
                        .header(SET_COOKIE, cookiePackager.packageToken(state, cookieDomainPath.getHost(), CookieKind.OAUTH_STATE).toString())
                        .build());
            case PERSONA:
                Mono<TokenResponse> refreshAccessTokenMono = oAuthClient.refreshAccessToken(realm, tokens.get(CookieKind.REFRESH));
                Mono<String> linkAccountMono = oAuthClient.personaLogin(realm, scopes, provider, UriUtil.selfLinkToApi(request, realm, ""))
                        .doOnError(exception -> log.info("Failed to negotiate persona token at beginning of account linking", exception))
                        .flatMap(tokenResponse -> accountLinkingService.finishAccountLinking(
                                tokenResponse.getAccessToken(), request.getCookies().getFirst("ic_token").getValue(), realm, tokens.get(CookieKind.REFRESH)
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

}
