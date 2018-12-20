package com.dnastack.ddapfrontend.route;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class IndexRouter {
    @Value("classpath:/static/redirect.html")
    private Resource indexHtml;

    // FIXME should route to index.html but can't because we need to rename/move main page in angular app
    @Bean
    RouterFunction<ServerResponse> index() {
        return RouterFunctions.route(RequestPredicates.GET("/"),
                                     request -> ServerResponse.ok()
                                                              .contentType(MediaType.TEXT_HTML)
                                                              .syncBody(indexHtml));
    }
}
