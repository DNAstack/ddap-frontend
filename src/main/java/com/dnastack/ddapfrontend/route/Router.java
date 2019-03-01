package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.ic.TokenResponse;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager.TokenAudience;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseCookie;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Optional;

import static com.dnastack.ddapfrontend.header.XForwardUtil.getExternalPath;
import static java.lang.String.format;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.MediaType.*;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.ServerResponse.*;

@Configuration
public class Router {

    private static final Logger log = LoggerFactory.getLogger(Router.class);

    // Added during maven build from angular-cli project
    @Value("classpath:/static/index.html")
    private Resource angularIndex;

    @Value("${idp.base-url}")
    private URI idpBaseUrl;

    @Value("${idp.client-id}")
    private String idpClientId;

    @Value("${idp.client-secret}")
    private String idpClientSecret;

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    // FIXME should serve angular app but we need proper login first
    @Bean
    RouterFunction<ServerResponse> index() {
        return RouterFunctions.route(GET("/"),
                                     request -> ok()
                                             .contentType(TEXT_HTML)
                                             .syncBody(redirectPageContent(request)));
    }

    private String redirectPageContent(ServerRequest request) {
        return format("<!DOCTYPE html>\n" +
                              "<html>\n" +
                              "<head>\n" +
                              "  <meta http-equiv=\"refresh\" content=\"0; URL='%s'\">\n" +
                              "</head>\n" +
                              "</html>\n",
                      rootLoginRedirectUrl(request));
    }

    private URI rootLoginRedirectUrl(ServerRequest request) {
        return URI.create(getExternalPath(request, "/api/identity/login"));
    }

    @Bean
    RouterFunction<ServerResponse> angularRoutes() {
        return RouterFunctions.route(GET("/**")
                                             .and(path("/api/**").negate())
                                             .and(path("/dam/**").negate())
                                             .and(path("/identity/**").negate())
                                             .and(pathExtension(StringUtils::isEmpty)),
                                     request -> ok()
                                             .contentType(TEXT_HTML)
                                             .syncBody(angularIndex));
    }

    @Bean
    RouterFunction<ServerResponse> apiLogin() {
        return RouterFunctions.route(GET("/api/identity/login"),
                                     this::handleApiLogin);
    }

    @Bean
    RouterFunction<ServerResponse> apiToken() {
        return RouterFunctions.route(GET("/api/identity/token"), this::handleTokenRequest);
    }

    private Mono<ServerResponse> handleTokenRequest(ServerRequest request) {
        final Optional<String> foundCode = request.queryParam("code");
        return foundCode.map(
                code -> idpTokenRequest(request, code)
                        .flatMap(response -> downstreamTokenResponse(request, response)))
                .orElseGet(
                        () -> badRequest().contentType(TEXT_PLAIN)
                                .syncBody("Token request requires 'code' parameter."));
    }

    private Mono<ServerResponse> downstreamTokenResponse(ServerRequest request, ClientResponse response) {
        if (response.statusCode().is2xxSuccessful() && contentTypeIsApplicationJson(response)) {
            return response.bodyToMono(TokenResponse.class)
                           .doOnError(this::logTokenResponseError)
                           .flatMap(token -> handleTokenResponse(response, request, token));
        } else {
            logTokenFailureInDetail(response);
            return badRequest().contentType(TEXT_PLAIN).syncBody("Failed to acquire token.");
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

    private Mono<ClientResponse> idpTokenRequest(ServerRequest request, String code) {
        return WebClient.create(format(idpBaseUrl.toString() + "identity/v1alpha/dnastack/token" +
                                               "?grant_type=authorization_code" +
                                               "&code=%s" +
                                               "&redirect_uri=%s" +
                                               "&clientId=%s" +
                                               "&clientSecret=%s",
                                       code,
                                       rootLoginRedirectUrl(request),
                                       idpClientId,
                                       idpClientSecret))
                        .post()
                        .exchange();
    }

    private Mono<ServerResponse> handleTokenResponse(ClientResponse response, ServerRequest request, TokenResponse token) {
        if (token == null || token.getAccessToken() == null || token.getIdToken() == null) {
            return failedUserTokenResponse(response);
        } else {
            return successfulUserTokenResponse(request, token);
        }
    }

    private Mono<ServerResponse> failedUserTokenResponse(ClientResponse response) {
        logTokenFailureInDetail(response);
        return status(INTERNAL_SERVER_ERROR).syncBody("Failed to parse token.");
    }

    private Mono<ServerResponse> successfulUserTokenResponse(ServerRequest request, TokenResponse token) {
        final URI redirectUri = URI.create(getExternalPath(request, "/data"));
        final String publicHost = redirectUri.getHost();
        final ResponseCookie damTokenCookie = cookiePackager.packageToken(token.getIdToken(), publicHost, TokenAudience.DAM);
        final ResponseCookie icTokenCookie = cookiePackager.packageToken(token.getAccessToken(), publicHost, TokenAudience.IC);
        return temporaryRedirect(redirectUri).cookie(damTokenCookie)
                                             .cookie(icTokenCookie)
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

    private URI authorizeUrl(String redirectUri) {
        return URI.create(format(
                idpBaseUrl.toString() + "identity/v1alpha/dnastack/authorize?response_type=code&clientId=%s&redirect_uri=%s",
                idpClientId,
                redirectUri));
    }

    private Mono<ServerResponse> handleApiLogin(ServerRequest request) {
        Optional<String> foundPersona = request.queryParam("persona");
        if (foundPersona.isPresent()) {
            return handlePersonaLogin(request, foundPersona.get());
        } else {
            return handleRegularLogin(request);
        }
    }

    private Mono<ServerResponse> handlePersonaLogin(ServerRequest request, String personaName) {
        String personaLoginUrl = format("%s/identity/v1alpha/dnastack/persona/%s" +
                "?client_id=%s" +
                "&redirect_uri=%s" +
                "&scope=ga4gh+account_admin",
                idpBaseUrl,
                personaName,
                idpClientId,
                getRegisteredRedirectUri(request));
        log.debug("Redirecting to persona login IC endpoint {}", personaLoginUrl);
        return temporaryRedirect(URI.create(personaLoginUrl)).build();
    }

    private Mono<ServerResponse> handleRegularLogin(ServerRequest request) {
        final Optional<String> foundRedirectUri = request.queryParam("redirect_uri");
        final String redirectUri = foundRedirectUri.orElseGet(() -> getRegisteredRedirectUri(request));

        return temporaryRedirect(authorizeUrl(redirectUri)).build();
    }

    private String getRegisteredRedirectUri(ServerRequest request) {
        return getExternalPath(request, "/api/identity/token");
    }
}
