package com.dnastack.ddap;

import io.restassured.RestAssured;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;

import static io.restassured.RestAssured.given;

public class ConfigE2eTest extends BaseE2eTest {

    private String basicUsername;
    private String basicPassword;

    @Before
    public void setup() {
        basicUsername = requiredEnv("E2E_BASIC_USERNAME");
        basicPassword = requiredEnv("E2E_BASIC_PASSWORD");
    }

    @Test
    public void doNotAcceptDevCredentials() {
        Assume.assumeFalse("Dev credentials are allowed on localhost", RestAssured.baseURI.startsWith("http://localhost:"));
        given()
            .log().method()
            .log().uri()
            .auth().preemptive().basic("dev", "dev")
        .when()
            .get("/index.html")
        .then()
            .log().ifValidationFails()
            .statusCode(401);
    }

    @Test
    public void mustRequireSomeCredentials() {
        given()
                .log().method()
                .log().uri()
        .when()
                .get("/index.html")
        .then()
                .log().ifValidationFails()
                .statusCode(401);
    }

    @Test
    public void canAccessRootWithoutCredentials() {
        given()
                .log().method()
                .log().uri()
        .when()
                .get("/")
        .then()
                .log().ifValidationFails()
                .statusCode(200);
    }

    @Test
    public void canAccessAngularIndexPage() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/index.html")
        .then()
                .log().ifValidationFails()
                .statusCode(200);
    }

    @Test
    public void canAccessDamEndpointPage() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
                .when()
                .get("/dam/v1/resources?persona=nci_researcher")
                .then()
                .log().ifValidationFails()
                .statusCode(200);
    }
}