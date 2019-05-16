package com.dnastack.ddapfrontend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Configuration
public class JacksonConfig {

    //add the protobuf http message converter
    @Bean
    ProtobufHttpMessageConverter protobufHttpMessageConverter() {
        return new ProtobufHttpMessageConverter();
    }

    @Bean
    RestTemplate restTemplate(ProtobufHttpMessageConverter hmc) {
        return new RestTemplate(List.of(hmc));
    }

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizedObjectMapper() {
        log.info("Initializing custom changes for jackson object mapper.");

        return objectMapper -> {
            objectMapper.failOnUnknownProperties(false);
        };
    }

}
