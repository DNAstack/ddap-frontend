package com.dnastack.ddap;

import io.restassured.RestAssured;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;

public class DefaultConfigE2eTest extends BaseE2eTest {

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
}