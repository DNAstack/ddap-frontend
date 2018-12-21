package com.dnastack.ddapfrontend.route;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.TEXT_HTML;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Configuration
public class Router {

    @Value("classpath:/static/redirect.html")
    private Resource redirectHtml;

    // Added during maven build from angular-cli project
    @Value("classpath:/static/index.html")
    private Resource angularIndex;

    // FIXME should serve angular app but we need proper login first
    @Bean
    RouterFunction<ServerResponse> index() {
        return RouterFunctions.route(GET("/"),
                                     request -> ok()
                                             .contentType(TEXT_HTML)
                                             .syncBody(redirectHtml));
    }

    @Bean
    RouterFunction<ServerResponse> angularRoutes() {
        return RouterFunctions.route(GET("/**")
                                             .and(path("/dam/**").negate())
                                             .and(pathExtension(StringUtils::isEmpty)),
                                     request -> ok()
                                             .contentType(TEXT_HTML)
                                             .syncBody(angularIndex));
    }
}
