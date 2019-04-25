package com.dnastack.ddapfrontend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class JacksonConfig {

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizedObjectMapper() {
        log.info("Initializing custom changes for jackson object mapper.");

        return objectMapper -> {
            objectMapper.failOnUnknownProperties(false);
        };
    }

}
