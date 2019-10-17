package com.dnastack.ddap.common.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.singletonList;

@Configuration
public class SecurityConfiguration {

    @Bean
    @ConfigurationProperties("ddap.cors.origins")
    public List<String> allowedOrigins() {
        return new ArrayList<>();
    };

    @Profile("!basic-auth")
    @Bean
    public SecurityWebFilterChain securityWebFilterChainNoAuth(ServerHttpSecurity http) {
        return http
                .authorizeExchange()
                .anyExchange().permitAll()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .build();
    }

    @Profile("basic-auth")
    @Bean
    public SecurityWebFilterChain securityWebFilterChainBasicAuth(ServerHttpSecurity http) {
        return http
                .authorizeExchange()
                .pathMatchers("/actuator/info**", "/actuator/health**", "/")
                .permitAll()
                .and()
                .authorizeExchange()
                .anyExchange().authenticated()
                .and()
                .httpBasic()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins());
        configuration.setAllowedMethods(singletonList("*"));
        final UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
        configurationSource.registerCorsConfiguration("/**", configuration);
        return configurationSource;
    }
}
