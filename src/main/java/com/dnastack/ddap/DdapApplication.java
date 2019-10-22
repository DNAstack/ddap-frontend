package com.dnastack.ddap;

import com.dnastack.ddap.ic.common.config.IdpProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableConfigurationProperties(value = { IdpProperties.class })
@SpringBootApplication
public class DdapApplication {

	public static void main(String[] args) {
		SpringApplication.run(DdapApplication.class, args);
	}

}

