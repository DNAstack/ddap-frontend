package com.dnastack.ddap.explore.common.config;

import com.dnastack.ddap.common.client.AuthAwareWebClientFactory;
import com.dnastack.ddap.common.config.DamProperties;
import com.dnastack.ddap.explore.dam.client.ReactiveDamClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.URI;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Configuration
public class DamClientsConfig {

    @Autowired
    private AuthAwareWebClientFactory webClientFactory;

    @Bean
    public Map<String, ReactiveDamClient> getDamClients(@Qualifier("dams") Map<String, DamProperties> dams)  {
        return dams.entrySet().stream()
            .map(damEntry -> {
                DamProperties properties = damEntry.getValue();
                return Map.of(damEntry.getKey(), new ReactiveDamClient(
                    URI.create(properties.getBaseUrl()),
                    properties.getClientId(),
                    properties.getClientSecret(),
                    webClientFactory
                ));
            })
            .flatMap(map -> map.entrySet().stream())
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

}
