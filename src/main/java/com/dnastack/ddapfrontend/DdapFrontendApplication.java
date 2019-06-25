package com.dnastack.ddapfrontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DdapFrontendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DdapFrontendApplication.class, args);
	}

}

