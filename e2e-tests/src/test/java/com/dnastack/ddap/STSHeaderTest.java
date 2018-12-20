package com.dnastack.ddap;

import io.restassured.RestAssured;
import org.hamcrest.Matchers;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import static io.restassured.RestAssured.given;

public class STSHeaderTest extends BaseE2eTest {

    @Before
    public void precondition() {
        final String baseURI = RestAssured.baseURI;
        Assume.assumeTrue("Cannot test strict transport security without https", baseURI.startsWith("https"));
    }

    @Ignore("STS header support not yet implemented.")
    @Test
    public void strictTransportSecurityHeaderShouldBeInResponseWhenRequestUsesHttps() {
        given()
                .log().method()
                .log().uri()
                .when()
                .get("/")
                .then()
                .log().ifValidationFails()
                .header("Strict-Transport-Security", Matchers.anything());
    }
}
