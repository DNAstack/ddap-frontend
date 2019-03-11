package com.dnastack.ddap.server;

import static io.restassured.RestAssured.given;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import io.restassured.RestAssured;
import org.hamcrest.Matchers;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

public class STSHeaderTest extends AbstractBaseE2eTest {

    @Before
    public void precondition() {
        final String baseURI = RestAssured.baseURI;
        Assume.assumeTrue("Cannot test strict transport security without https", baseURI.startsWith("https"));
    }

    @Test
    @Ignore("STS header support not yet implemented.")
    public void strictTransportSecurityHeaderShouldBeInResponseWhenRequestUsesHttps() {
        given()
                .log().method()
                .log().uri()
                .when()
                .get("/index.html")
                .then()
                .log().ifValidationFails()
                .header("Strict-Transport-Security", Matchers.notNullValue());
    }
}
