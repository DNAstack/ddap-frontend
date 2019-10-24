package com.dnastack.ddap.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class DamsConfig {

    @Bean("dams")
    @ConfigurationProperties("dams")
    public Map<String, DamProperties> getStaticDamsConfig() {
        return new HashMap<>();
    }

}
