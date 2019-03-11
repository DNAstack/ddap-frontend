package com.dnastack.ddap.server;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import org.junit.Test;

public class ActuatorE2eTest extends AbstractBaseE2eTest {

    @Test
    public void appNameAndVersionShouldBeExposed() {
        given()
            .log().method()
            .log().uri()
        .when()
            .get("/actuator/info")
        .then()
            .log().ifValidationFails()
            .statusCode(200)
            .body("build.name", equalTo("ddap-frontend"))
            .body("build.version", notNullValue());
    }
}