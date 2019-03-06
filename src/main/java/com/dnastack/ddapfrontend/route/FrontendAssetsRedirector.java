package com.dnastack.ddapfrontend.route;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static java.lang.String.format;
import static org.springframework.http.MediaType.TEXT_HTML;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Slf4j
@RestController
public class FrontendAssetsRedirector {

    // Added during maven build from angular-cli project
    @Value("classpath:/static/index.html")
    private Resource angularIndex;

    @Value("${ddap.default-realm}")
    private String defaultRealm;

    // FIXME should serve angular app but we need proper login first
    @GetMapping(path = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String index(ServerHttpRequest request) {
        return format("<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "  <meta http-equiv=\"refresh\" content=\"0; URL='%s'\">\n" +
                        "</head>\n" +
                        "</html>\n",
                IdentityController.rootLoginRedirectUrl(request, defaultRealm));
    }

    @Bean
    RouterFunction<ServerResponse> angularRoutes() {
        return RouterFunctions.route(GET("/**")
                        .and(path("/").negate())
                        .and(path("/api/**").negate())
                        .and(path("/dam/**").negate())
                        .and(path("/identity/**").negate())
                        .and(pathExtension(StringUtils::isEmpty)),
                request -> ok()
                        .contentType(TEXT_HTML)
                        .syncBody(angularIndex));
    }
}
