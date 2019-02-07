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
                      redirectUrl(request));
    }

    private URI redirectUrl(ServerRequest request) {
        return URI.create(getExternalPath(request, "/api/identity/login"));
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
            return temporaryRedirect(redirectUrl(request)).build();
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

    @Bean
    RouterFunction<ServerResponse> searchQuery() {
        return RouterFunctions.route(GET("/api/resources/{resourceId}/search"), this::handleSearchQuery);
    }

    private Mono<ServerResponse> handleSearchQuery(ServerRequest request) {
        final Optional<String> foundType = request.queryParam("type");
        return foundType.map(type -> handleBeaconQuery(request))
                        .orElseGet(() -> badRequest().syncBody(format("Invalid search type [%s]",
                                                                      foundType.orElse(""))));

    }

    private Mono<ServerResponse> handleBeaconQuery(ServerRequest request) {
        final Optional<String> assemblyId = request.queryParam("assemblyId");
        final Optional<String> foundRefName = request.queryParam("referenceName");
        final Optional<String> foundStart = request.queryParam("start");
        final Optional<String> foundRefBases = request.queryParam("referenceBases");
        final Optional<String> foundAlternateBases = request.queryParam("alternateBases");

        final String queryTemplate = "https://beacon.cafevariome.org/query" +
                "?assemblyId=%s" +
                "&referenceName=%s" +
                "&start=%s" +
                "&referenceBases=%s" +
                "&alternateBases=%s";

        return WebClient.create()
                        .get()
                        .uri(format(
                                queryTemplate,
                                assemblyId.get(),
                                foundRefName.get(),
                                foundStart.get(),
                                foundRefBases.get(),
                                foundAlternateBases.get()))
                        .exchange()
                        .flatMap(clientResponse -> clientResponse.bodyToMono(String.class)
                                                                 .flatMap(body -> ok().syncBody(body)));

    }

    private Mono<ServerResponse> handleTokenRequest(ServerRequest request) {
        final Optional<String> foundCode = request.queryParam("code");
        return foundCode.map(code ->
                                     idpTokenRequest(request, code).flatMap(response -> downstreamTokenResponse(request,
                                                                                                       response)))
                        .orElseGet(() -> badRequest().contentType(TEXT_PLAIN)
                                                     .syncBody("Token request requires 'code' parameter."));
    }

    private Mono<ServerResponse> downstreamTokenResponse(ServerRequest request, ClientResponse response) {
        if (response.statusCode().is2xxSuccessful() && contentTypeIsApplicationJson(response)) {
            return response.bodyToMono(String.class)
                           .map(this::extractToken)
                           .flatMap(oToken -> oToken.map(token -> successfulUserTokenResponse(request, token))
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

    private Mono<ClientResponse> idpTokenRequest(ServerRequest request, String code) {
        return WebClient.create(format(idpBaseUrl.toString() + "identity/v1alpha/token" +
                                               "?grant_type=authorization_code" +
                                               "&code=%s" +
                                               "&redirect_uri=%s" +
                                               "&clientId=%s" +
                                               "&clientSecret=%s",
                                       code,
                                       redirectUrl(request),
                                       idpClientId,
                                       idpClientSecret))
                        .post()
                        .exchange();
    }

    private Mono<ServerResponse> failedUserTokenResponse(ClientResponse response) {
        logTokenFailureInDetail(response);
        return status(INTERNAL_SERVER_ERROR).syncBody("Failed to parse token.");
    }

    private Mono<ServerResponse> successfulUserTokenResponse(ServerRequest request, String token) {
        final URI redirectUri = URI.create(getExternalPath(request, "/data"));
        final String publicHost = redirectUri.getHost();
        return temporaryRedirect(redirectUri).cookie(
                ResponseCookie.from("user_token", token)
                              .domain(publicHost)
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
        final String redirectUri = foundRedirectUri.orElseGet(() -> getExternalPath(request, "/api/identity/token"));

        return temporaryRedirect(authorizeUrl(redirectUri)).build();
    }
}
