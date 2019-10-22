package com.dnastack.ddap.ic.common.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.net.URI;

@Data
@ConfigurationProperties(prefix = "idp")
public class IdpProperties {

    private URI baseUrl;
    private String clientId;
    private String clientSecret;

}
