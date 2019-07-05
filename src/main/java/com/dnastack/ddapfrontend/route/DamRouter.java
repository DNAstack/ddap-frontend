package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.config.Dam;
import com.dnastack.ddapfrontend.proxy.LoggingGatewayFilterFactory;
import com.dnastack.ddapfrontend.proxy.SetBearerTokenFromCookieGatewayFilterFactory;
import com.dnastack.ddapfrontend.proxy.TimeoutAndRetryGatewayFilterFactory;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

import static java.lang.String.format;

@Configuration
public class DamRouter {

    @Autowired
    @Qualifier("dams")
    private Map<String, Dam> dams;

    @Autowired
    private TimeoutAndRetryGatewayFilterFactory timeoutAndRetryFilterFactory;

    @Autowired
    private LoggingGatewayFilterFactory loggingFilterFactory;

    @Autowired
    private SetBearerTokenFromCookieGatewayFilterFactory bearerTokenFilterFactory;

    @Bean
    public RouteLocator damRoutes(RouteLocatorBuilder builder) {
        // TODO read from config
        final TimeoutAndRetryGatewayFilterFactory.RetryConfig timeoutAndRetryConfig = new TimeoutAndRetryGatewayFilterFactory.RetryConfig();
        timeoutAndRetryConfig.setRetries(2);
        timeoutAndRetryConfig.setMinimumTimeout(1000);
        timeoutAndRetryConfig.setMaximumTimeout(20000);
        timeoutAndRetryConfig.setTimeoutExponentialScalingBase(10);

        final GatewayFilter timeoutAndRetryFilter = timeoutAndRetryFilterFactory.apply(timeoutAndRetryConfig);

        final GatewayFilter loggingFilter = loggingFilterFactory.apply(new Object());

        final SetBearerTokenFromCookieGatewayFilterFactory.Config bearerTokenConfig = new SetBearerTokenFromCookieGatewayFilterFactory.Config();
        bearerTokenConfig.setCookieKind(UserTokenCookiePackager.CookieKind.DAM);
        final GatewayFilter bearerTokenFilter = bearerTokenFilterFactory.apply(bearerTokenConfig);

        RouteLocatorBuilder.Builder routesBuilder = builder.routes();
        for (Map.Entry<String, Dam> entry : dams.entrySet()) {
            final String id = entry.getKey();
            final Dam dam = entry.getValue();
            routesBuilder =
                    routesBuilder
                            .route(id,
                                   r -> r.path(format("/dam/%s/**", id))
                                         .filters(f -> f.filter(timeoutAndRetryFilter)
                                                        .filter(loggingFilter)
                                                        .rewritePath("^/dam/[^/]+/", "/dam/")
                                                        .addRequestParameter("clientId",
                                                                             dam.getClientId())
                                                        .addRequestParameter("clientSecret",
                                                                             dam.getClientSecret())
                                                        .removeRequestHeader("Authorization")
                                                        .filter(bearerTokenFilter)
                                         )
                                         .uri(dam.getBaseUrl()));
        }
        return routesBuilder.build();
    }

}
