package com.dnastack.ddap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DdapApplication {

	public static void main(String[] args) {
		SpringApplication.run(DdapApplication.class, args);
	}

}

