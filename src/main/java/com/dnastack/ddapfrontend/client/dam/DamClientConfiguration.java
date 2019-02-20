package com.dnastack.ddapfrontend.client.dam;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.Client;
import feign.Feign;
import feign.Logger;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.okhttp.OkHttpClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class DamClientConfiguration {

    @Bean
    public DamClient damClient(
            @Value("${dam.base-url}") String url,
            @Value("${dam.client-id}") String clientId,
            @Value("${dam.client-secret}") String clientSecret) {
        Client httpClient = new OkHttpClient();

        ObjectMapper damObjectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        return Feign.builder()
                .client(httpClient)
                .encoder(new JacksonEncoder(damObjectMapper))
                .decoder(new JacksonDecoder(damObjectMapper))
                .logger(new Logger() {
                    @Override
                    protected void log(String configKey, String format, Object... args) {
                        log.info("{} {}", configKey, String.format(format, args));
                    }
                })
                .logLevel(Logger.Level.FULL)
                .requestInterceptor(template -> template
                        .query("clientId", clientId)
                        .query("clientSecret", clientSecret))
                .target(DamClient.class, url);
    }
}
