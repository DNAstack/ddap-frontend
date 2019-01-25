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
    public void requireSomeCredentials() {
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
    public void accessRootWithoutCredentials() {
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
    public void accessAngularIndexPage() {
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
    public void accessDamEndpoint() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/dam/v1alpha/resources")
        .then()
                .log().ifValidationFails()
                .contentType("application/json")
                .statusCode(200);
    }

    @Test
    public void accessIdpEndpoint() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
                .when()
                .get("/identity/v1alpha/config?persona=nci_researcher")
                .then()
                .log().ifValidationFails()
                .contentType("application/json")
                .statusCode(200);
    }

    @Test
    public void serveAngularRoutes() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/resources")
        .then()
                .log().ifValidationFails()
                .statusCode(200);
    }

    @Test
    public void angularRoutesDoNotWorkForJavaScriptFiles() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/made-up-resource-name.js")
        .then()
                .log().ifValidationFails()
                .statusCode(404);
    }

    @Test
    public void noAngularRoutesForMapFiles() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/made-up-resource-name.js.map")
        .then()
                .log().ifValidationFails()
                .statusCode(404);
    }

    @Test
    public void noAngularRoutesForHtmlFiles() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/made-up-resource-name.html")
        .then()
                .log().ifValidationFails()
                .statusCode(404);
    }

    @Test
    public void noAngularRoutesForFileWithArbitraryExtension() {
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
        .when()
                .get("/made-up-resource-name.foobar")
        .then()
                .log().ifValidationFails()
                .statusCode(404);
    }
}
