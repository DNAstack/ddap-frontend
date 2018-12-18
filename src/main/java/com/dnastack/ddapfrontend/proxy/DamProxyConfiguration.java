//package com.dnastack.ddapfrontend.proxy;
//
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DamProxyConfiguration {
//
//    @Bean
//    public RouteLocator damRouteLocator(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("dam_route", r -> r.path("/dam/")
//                        .filters(f -> f.rewritePath("/dam/(?<segment>.*)", "/anything/${segment}?token=well-hello-there"))
//                        .uri("http://httpbin.org"))
//                .build();
//    }
//}
