package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.cli.CliLoginStatus;
import com.dnastack.ddapfrontend.cli.CliSessionNotFound;
import com.dnastack.ddapfrontend.cli.TokenResponse;
import com.dnastack.ddapfrontend.client.ic.ReactiveIdentityConcentratorClient;
import com.dnastack.ddapfrontend.security.BadCredentialsException;
import com.dnastack.ddapfrontend.security.JwtHandler;
import com.dnastack.ddapfrontend.security.OAuthStateHandler;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.dnastack.ddapfrontend.http.UriUtil.selfLinkToApi;
import static java.lang.String.format;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/cli")
public class CommandLineAccessController {
    private static final String DEFAULT_SCOPES = "openid ga4gh account_admin identities";

    private final ReactiveIdentityConcentratorClient icClient;
    private final OAuthStateHandler stateHandler;
    private Duration tokenTtl;

    private final JwtHandler jwtHandler;
    private final Pattern bearerTokenPattern = Pattern.compile("^Bearer ([^\\s]+).*$");

    /*
     * IMPORTANT
     * If we intend to support CLI login in the future, this state must migrate to a data-store (BigTable, Redis, etc.).
     * This is a quick hack to support this feature in phase 1.
     */
    private final ConcurrentMap<String, LoginStatus> loginStatusByCliSessionId = new ConcurrentHashMap<>();

    @Autowired
    public CommandLineAccessController(OAuthStateHandler stateHandler,
                                       ReactiveIdentityConcentratorClient icClient,
                                       @Value("${ddap.command-line-service.aud}") String tokenAudience,
                                       @Value("${ddap.command-line-service.ttl}") Duration tokenTtl,
                                       @Value("${ddap.command-line-service.signingKey}") String tokenSigningKeyBase64) {
        this.icClient = icClient;
        this.stateHandler = stateHandler;
        this.tokenTtl = tokenTtl;
        this.jwtHandler = new JwtHandler(tokenAudience,
                                         tokenTtl,
                                         Keys.hmacShaKeyFor(Base64.getMimeDecoder().decode(tokenSigningKeyBase64)));
    }

    @PostMapping("/login")
    public Mono<? extends ResponseEntity<?>> commandLineLogin(ServerHttpRequest request,
                                                              @PathVariable String realm,
                                                              @RequestParam(defaultValue = DEFAULT_SCOPES) String scope) {
        // TODO: Store in map to track login status
        final String cliSessionId = UUID.randomUUID().toString();
        loginStatusByCliSessionId.compute(cliSessionId, (id, monitor) -> {
            if (monitor == null) {
                return new LoginStatus(Instant.now().plus(tokenTtl), null);
            } else {
                // TODO retry retry regenerating a couple times.
                throw new RuntimeException("Failed to generate unique CLI session id.");
            }
        });

        final URI statusUrl = selfLinkToApi(request, realm, format("cli/login/%s/status", cliSessionId));
        final String state = stateHandler.generateCommandLineLoginState(cliSessionId);
        final URI webLoginUrl = icClient.getAuthorizeUrl(realm,
                                                         state,
                                                         scope,
                                                         selfLinkToApi(request,
                                                                       realm,
                                                                       format("cli/login/%s", cliSessionId)),
                                                         null);
        final String bearerToken = jwtHandler.createBuilder(JwtHandler.TokenKind.BEARER)
                                             .setSubject(cliSessionId)
                                             .claim("tokenKind", "bearer")
                                             .claim("webLoginUrl", webLoginUrl)
                                             .compact();


        return Mono.just(ResponseEntity.status(200)
                                       .location(statusUrl)
                                       .header("Authorization", "Bearer " + bearerToken)
                                       .build());
    }

    @GetMapping(path = "/login/{cliSessionId}/status", headers = "Authorization")
    public Mono<CliLoginStatus> loginStatus(@PathVariable("realm") String realm,
                                            @PathVariable("cliSessionId") String cliSessionId,
                                            @RequestHeader("Authorization") List<String> authHeaders) {
        final Optional<String> oBearerToken = authHeaders.stream()
                                                         .map(bearerTokenPattern::matcher)
                                                         .filter(Matcher::matches)
                                                         .map(matcher -> matcher.group(1))
                                                         .findFirst();
        if (oBearerToken.isPresent()) {
            final String jwt = oBearerToken.get();
            final Jws<Claims> jws = jwtHandler.createParser(JwtHandler.TokenKind.BEARER)
                                              .requireSubject(cliSessionId)
                                              .parseClaimsJws(jwt);
            final URI webLoginUrl = URI.create(jws.getBody().get("webLoginUrl", String.class));

            final LoginStatus loginStatus = loginStatusByCliSessionId.get(cliSessionId);
            final TokenResponse tokenResponse = loginStatus.getTokenResponse();
            return Mono.just(new CliLoginStatus(tokenResponse, webLoginUrl));
        } else {
            return Mono.error(new BadCredentialsException(
                    "Authorization header was set but did not contain bearer token."));
        }
    }

    @GetMapping(path = "/login/{cliSessionId}", params = "code")
    public Mono<? extends ResponseEntity<?>> finishCliLogin(ServerHttpRequest request, @PathVariable("realm") String realm,
                                                            @PathVariable("cliSessionId") String cliSessionId,
                                                            @RequestParam("code") String code) {
        final LoginStatus loginStatus = loginStatusByCliSessionId.get(cliSessionId);
        if (loginStatus == null) {
            return Mono.error(new CliSessionNotFound(cliSessionId));
        } else {
            return icClient.exchangeAuthorizationCodeForTokens(realm,
                                                               selfLinkToApi(request,
                                                                             realm,
                                                                             ""),
                                                               code)
                           .doOnSuccess(tokenResponse -> {
                               loginStatusByCliSessionId.compute(cliSessionId, (id, oldStatus) -> {
                                   if (oldStatus == null) {
                                       throw new CliSessionNotFound(cliSessionId);
                                   } else {
                                       return new LoginStatus(oldStatus.getExpiry(),
                                                              new TokenResponse(tokenResponse.getIdToken(),
                                                                                tokenResponse.getAccessToken()));
                                   }
                               });
                           })
                           .thenReturn(ResponseEntity.ok().build());
        }
    }

    @Scheduled(fixedRate = 5*60*1000)
    public void cleanupCliSessions() {
        log.info("Starting cleanup of CLI sessions");
        final Instant start = Instant.now();
        final List<String> expiredSessionIds = loginStatusByCliSessionId.entrySet()
                                                                        .stream()
                                                                        .filter(e -> e.getValue()
                                                                                      .getExpiry()
                                                                                      .isBefore(start))
                                                                        .map(Map.Entry::getKey)
                                                                        .collect(Collectors.toList());

        expiredSessionIds.forEach(loginStatusByCliSessionId::remove);
        final Instant end = Instant.now();
        final Duration duration = Duration.between(start, end);
        log.info("Removed {} CLI sessions in {}ms",
                 expiredSessionIds.size(),
                 TimeUnit.NANOSECONDS.toMillis(duration.get(ChronoUnit.NANOS)));
    }

    @lombok.Value
    private static class LoginStatus {
        private Instant expiry;
        private TokenResponse tokenResponse;
    }
}
