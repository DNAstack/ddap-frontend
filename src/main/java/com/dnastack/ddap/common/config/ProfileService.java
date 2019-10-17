package com.dnastack.ddap.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class ProfileService {

    @Autowired
    private Environment environment;

    public boolean isSandboxProfileActive() {
        return Arrays.stream(environment.getActiveProfiles())
                .anyMatch(profile -> profile.equalsIgnoreCase("sandbox"));
    }

}
