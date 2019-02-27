package com.dnastack.ddap;

import io.restassured.RestAssured;
import org.junit.Before;

import static org.junit.Assert.fail;

public class BaseE2eTest {

    static final String DDAP_USERNAME = requiredEnv("E2E_BASIC_USERNAME");
    static final String DDAP_PASSWORD = requiredEnv("E2E_BASIC_PASSWORD");
    static final String DDAP_BASE_URL = requiredEnv("E2E_BASE_URI");

    @Before
    public void setUp() {
        RestAssured.baseURI = DDAP_BASE_URL;
    }

    protected static String requiredEnv(String name) {
        String val = System.getenv(name);
        if (val == null) {
            fail("Environnment variable `" + name + "` is required");
        }
        return val;
    }

    protected static String optionalEnv(String name, String defaultValue) {
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }
}
