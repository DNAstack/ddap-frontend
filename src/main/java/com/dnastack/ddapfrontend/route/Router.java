package com.dnastack.ddapfrontend.route;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpCookie;
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

    @Value("${ddap.public-uri}")
    private URI publicUri;

    @Value("${idp.base-url}")
    private URI idpBaseUrl;

    @Value("${idp.client-id}")
    private String idpClientId;

    @Value("${idp.client-secret}")
    private String idpClientSecret;

    // FIXME should serve angular app but we need proper login first
    @Bean
    RouterFunction<ServerResponse> index() {
        return RouterFunctions.route(GET("/"),
                                     request -> ok()
                                             .contentType(TEXT_HTML)
                                             .syncBody(redirectPageContent()));
    }

    private String redirectPageContent() {
        return format("<!DOCTYPE html>\n" +
                              "<html>\n" +
                              "<head>\n" +
                              "  <meta http-equiv=\"refresh\" content=\"0; URL='%s'\">\n" +
                              "</head>\n" +
                              "</html>\n",
                      redirectUrl());
    }

    private URI redirectUrl() {
        return publicUri.resolve("/api/identity/login");
    }

    @Bean
    RouterFunction<ServerResponse> angularRoutes() {
        return RouterFunctions.route(GET("/**")
                                             .and(path("/api/**").negate())
                                             .and(path("/dam/**").negate())
                                             .and(path("/identity/**").negate())
                                             .and(pathExtension(StringUtils::isEmpty)),
                                     this::handleAngularRequest);
    }

    private Mono<ServerResponse> handleAngularRequest(ServerRequest request) {
        final Optional<HttpCookie> foundCookie = Optional.ofNullable(request.cookies()
                                                                            .getFirst("user_token"));
        // Can't parse token yet because we don't have a public key (uses symmetric encryption)
//        final boolean hasValidToken = foundCookie.map(HttpCookie::getValue)
//                                                 .map(token -> jwtParser.parse(token))
//                                                 .map(jwt -> ((Claims) jwt.getBody()).getExpiration())
//                                                 .filter(exp -> exp.toInstant().isBefore(Instant.now()))
//                                                 .isPresent();
        final boolean hasValidToken = true;

        if (hasValidToken) {
            return ok()
                    .contentType(TEXT_HTML)
                    .syncBody(angularIndex);
        } else {
            return temporaryRedirect(redirectUrl()).build();
        }
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
        return foundCode.map(code -> idpTokenRequest(code).flatMap(this::downstreamTokenResponse))
                        .orElseGet(() -> badRequest().contentType(TEXT_PLAIN)
                                                     .syncBody("Token request requires 'code' parameter."));
    }

    private Mono<ServerResponse> downstreamTokenResponse(ClientResponse response) {
        if (response.statusCode().is2xxSuccessful() && contentTypeIsApplicationJson(response)) {
            return response.bodyToMono(String.class)
                           .map(this::extractToken)
                           .flatMap(oToken -> oToken.map(this::successfulUserTokenResponse)
                                                    .orElseGet(() -> failedUserTokenResponse(response)));
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

    private Mono<ClientResponse> idpTokenRequest(String code) {
        return WebClient.create(format(idpBaseUrl.toString() + "identity/v1alpha/token" +
                                               "?grant_type=authorization_code" +
                                               "&code=%s" +
                                               "&redirect_uri=%s" +
                                               "&clientId=%s" +
                                               "&clientSecret=%s",
                                       code,
                                       redirectUrl(),
                                       idpClientId,
                                       idpClientSecret))
                        .post()
                        .exchange();
    }

    private Mono<ServerResponse> failedUserTokenResponse(ClientResponse response) {
        logTokenFailureInDetail(response);
        return status(INTERNAL_SERVER_ERROR).syncBody("Failed to parse token.");
    }

    private Mono<ServerResponse> successfulUserTokenResponse(String token) {
        return temporaryRedirect(publicUri.resolve("/data")).cookie(
                ResponseCookie.from("user_token", token)
                              .domain(publicUri.getHost())
                              .path("/")
                              .build())
                   .build();
    }

    private boolean contentTypeIsApplicationJson(ClientResponse response) {
        return response.headers()
                       .contentType()
                       .filter(mediaType -> mediaType.isCompatibleWith(
                               APPLICATION_JSON))
                       .isPresent();
    }

    private Optional<String> extractToken(String body) {
        try {
            return Optional.of(((JSONObject) new JSONParser().parse(body)).get("accessToken").toString());
        } catch (ParseException | NullPointerException e) {
            if (log.isDebugEnabled()) {
                log.debug("Unable to parse token from payload. Payload: " + body, e);
            }
            return Optional.empty();
        }
    }

    private URI authorizeUrl(String redirectUri) {
        return URI.create(format(
                idpBaseUrl.toString() + "identity/v1alpha/authorize?response_type=code&clientId=%s&redirect_uri=%s",
                idpClientId,
                redirectUri));
    }

    private Mono<ServerResponse> handleApiLogin(ServerRequest request) {
        final Optional<String> foundRedirectUri = request.queryParam("redirect_uri");
        final String redirectUri = foundRedirectUri.orElseGet(() -> publicUri + "/api/identity/token");

        return temporaryRedirect(authorizeUrl(redirectUri)).build();
    }
}
