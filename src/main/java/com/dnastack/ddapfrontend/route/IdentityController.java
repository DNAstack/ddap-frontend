package com.dnastack.ddapfrontend.route;

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
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.dnastack.ddapfrontend.header.XForwardUtil.getExternalPath;
import static java.lang.String.format;
import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.TEMPORARY_REDIRECT;
import static org.springframework.http.MediaType.APPLICATION_JSON;
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

    @Value("${idp.base-url}")
    private URI idpBaseUrl;

    @Value("${idp.client-id}")
    private String idpClientId;

    @Value("${idp.client-secret}")
    private String idpClientSecret;

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
                                      @RequestParam(required = false) String redirectUri) {
        Optional<String> foundPersona = Optional.ofNullable(request.getQueryParams().getFirst("persona"));
        if (foundPersona.isPresent()) {
            return handlePersonaLogin(request, realm, foundPersona.get());
        } else {
            final String resultRedirectUri;
            if (redirectUri != null) {
                resultRedirectUri = redirectUri;
            } else {
                resultRedirectUri = getRegisteredRedirectUri(request, realm);
            }

            return handleRegularLogin(realm, resultRedirectUri);
        }
    }

    @GetMapping("/token")
    public Mono<ResponseEntity<?>> handleTokenRequest(ServerHttpRequest request,
                                                @PathVariable String realm,
                                                @RequestParam(required = false) String code) {
        if (code != null) {
            return idpTokenRequest(rootLoginRedirectUrl(request, realm), realm, code)
                    .flatMap(idpTokenResponse -> downstreamTokenResponse(request, idpTokenResponse, realm));
        } else {
            return Mono.just(ResponseEntity.badRequest().contentType(TEXT_PLAIN)
                    .body("Token request requires 'code' parameter."));
        }
    }

    private Mono<ResponseEntity<?>> downstreamTokenResponse(ServerHttpRequest request, ClientResponse response, String realm) {
        if (response.statusCode().is2xxSuccessful() && contentTypeIsApplicationJson(response)) {
            return response.bodyToMono(TokenResponse.class)
                    .doOnError(this::logTokenResponseError)
                    .map(token -> handleTokenResponse(request, realm, response, token));
        } else {
            logTokenFailureInDetail(response);
            return Mono.just(ResponseEntity.badRequest().contentType(TEXT_PLAIN)
                    .body("Failed to acquire token."));
        }
    }

    private void logTokenFailureInDetail(ClientResponse response) {
        if (log.isDebugEnabled()) {
            response.bodyToMono(String.class).subscribe(body -> {
                log.debug("Failed to negotiate token. Status=[{}], ContentType=[{}], Body=[{}]",
                        response.statusCode().toString(),
                        response.headers().contentType().map(Object::toString).orElse("none"),
                        body);
            });
        }
    }

    private Mono<ClientResponse> idpTokenRequest(URI rootLoginRedirectUrl, String realm, String code) {
        final UriTemplate template = new UriTemplate("{idpBaseUrl}/identity/v1alpha/{realm}/token" +
                "?grant_type=authorization_code" +
                "&code={code}" +
                "&redirect_uri={redirectUri}" +
                "&clientId={clientId}" +
                "&clientSecret={clientSecret}");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("idpBaseUrl", idpBaseUrl);
        variables.put("realm", realm);
        variables.put("code", code);
        variables.put("redirectUri", rootLoginRedirectUrl);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);

        final URI uri = template.expand(variables);
        return WebClient.create(uri.toString())
                .post()
                .exchange();
    }

    private ResponseEntity<?> handleTokenResponse(ServerHttpRequest request, String realm, ClientResponse response, TokenResponse token) {
        if (token == null || token.getAccessToken() == null || token.getIdToken() == null) {
            return failedUserTokenResponse(response);
        } else {
            return successfulUserTokenResponse(request, realm, token);
        }
    }

    private ResponseEntity<?> failedUserTokenResponse(ClientResponse response) {
        logTokenFailureInDetail(response);
        return ResponseEntity.status(INTERNAL_SERVER_ERROR).body("Failed to parse token.");
    }

    private ResponseEntity<?> successfulUserTokenResponse(ServerHttpRequest request, String realm, TokenResponse token) {
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

    private boolean contentTypeIsApplicationJson(ClientResponse response) {
        return response.headers()
                .contentType()
                .filter(mediaType -> mediaType.isCompatibleWith(
                        APPLICATION_JSON))
                .isPresent();
    }

    private void logTokenResponseError(Throwable t) {
        log.debug("Unable to parse token from payload.", t);
    }

    private URI authorizeUrl(String redirectUri, String realm) {
        final UriTemplate template = new UriTemplate("{idpBaseUrl}/identity/v1alpha/{realm}/authorize?response_type=code&clientId={clientId}&redirect_uri={redirectUri}");

        final HashMap<String, Object> variables = new HashMap<>();
        variables.put("idpBaseUrl", idpBaseUrl);
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("redirectUri", redirectUri);

        return template.expand(variables);
    }

    private ResponseEntity<?> handlePersonaLogin(ServerHttpRequest request, String realm, String personaName) {
        final UriTemplate template = new UriTemplate("{idpBaseUrl}/identity/v1alpha/{realm}/personas/{persona}" +
                "?client_id={clientId}" +
                "&client_secret={clientSecret}" +
                "&redirect_uri={redirectUri}" +
                "&scope=ga4gh+account_admin");
        final Map<String, Object> variables = new HashMap<>();
        variables.put("idpBaseUrl", idpBaseUrl);
        variables.put("persona", personaName);
        variables.put("realm", realm);
        variables.put("clientId", idpClientId);
        variables.put("clientSecret", idpClientSecret);
        variables.put("redirectUri", getRegisteredRedirectUri(request, realm));

        final String personaLoginUrl = template.expand(variables).toString();

        log.debug("Redirecting to persona login IC endpoint {}", personaLoginUrl);
        return ResponseEntity.status(TEMPORARY_REDIRECT).location(URI.create(personaLoginUrl)).build();
    }

    private ResponseEntity<?> handleRegularLogin(String realm, String redirectUri) {
        return ResponseEntity.status(TEMPORARY_REDIRECT).location(authorizeUrl(redirectUri, realm)).build();
    }

    private String getRegisteredRedirectUri(ServerHttpRequest request, String realm) {
        return getExternalPath(request, format("/api/v1alpha/%s/identity/token", realm));
    }
}
