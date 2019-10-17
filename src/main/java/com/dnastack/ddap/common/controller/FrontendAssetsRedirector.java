package com.dnastack.ddap.common.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.TEXT_HTML;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@RestController
public class FrontendAssetsRedirector {

    // Added during maven build from angular-cli project
    @Value("classpath:/static/index.html")
    private Resource angularIndex;

    @Value("${ddap.default-realm}")
    private String defaultRealm;

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
}
