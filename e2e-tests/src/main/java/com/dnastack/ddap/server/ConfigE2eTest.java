package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import lombok.Data;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class ConfigE2eTest extends AbstractBaseE2eTest {

    private String basicUsername;
    private String basicPassword;

    @Before
    public void setup() {
        basicUsername = requiredEnv("E2E_BASIC_USERNAME");
        basicPassword = requiredEnv("E2E_BASIC_PASSWORD");
    }

    @Test
    public void doNotAcceptDevCredentials() {
        Assume.assumeTrue(basicPassword != null);
        Assume.assumeFalse("Dev credentials are allowed on localhost", RestAssured.baseURI.startsWith("http://localhost:"));
        Assume.assumeFalse("Dev credentials are allowed on localhost", RestAssured.baseURI.startsWith("http://host.docker.internal:"));
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

    @Test(expected = SignatureException.class)
    public void doNotUseDevSigningKeyForCliLogin() {
        Assume.assumeFalse("Dev keys are allowed on localhost", RestAssured.baseURI.startsWith("http://localhost:"));
        Assume.assumeFalse("Dev keys are allowed on localhost", RestAssured.baseURI.startsWith("http://host.docker.internal:"));
        final Response response = given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
                .when()
                .post("/api/v1alpha/dnastack/cli/login");
        response
                .then()
                .log().ifValidationFails()
                .statusCode(200)
                .body("token", not(isEmptyOrNullString()));

        final String jwt = response.body().as(CliLoginResponse.class).getToken();
        final String base64EncodedDevSigningKey = "VGhlcmUgb25jZSB3YXMgYSBsYW5ndWFnZSBjYWxsZWQgYmFzaApJdCdzIHNlbWFudGljcyB3ZXJlIG9mdGVuIHF1aXRlIHJhc2gKQnV0IGl0IHdvcmtlZCwgbW9yZSBvciBsZXNzCkV2ZW4gdGhvdWdoIGl0J3MgYSBtZXNzClNvIEkgZ3Vlc3MgaXQgc3RheXMgb3V0IG9mIHRoZSB0cmFzaAo=";
        Jwts.parser()
            .setSigningKey(base64EncodedDevSigningKey)
            .parseClaimsJws(jwt);
    }

    @Test(expected = SignatureException.class)
    public void doNotUseDevSigningKeyForOAuthState() {
        Assume.assumeFalse("Dev keys are allowed on localhost", RestAssured.baseURI.startsWith("http://localhost:"));
        Assume.assumeFalse("Dev keys are allowed on localhost", RestAssured.baseURI.startsWith("http://host.docker.internal:"));
        final Response response = given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
                .redirects().follow(false)
                .when()
                .get("/api/v1alpha/dnastack/identity/login");
        response
                .then()
                .log().ifValidationFails()
                .statusCode(allOf(greaterThanOrEqualTo(300), lessThan(400)))
                .header("Location", startsWith("https://"));

        final URI location = URI.create(response.getHeader("Location"));
        final List<NameValuePair> queryPairs = URLEncodedUtils.parse(location, Charset.forName("UTF-8"));
        final String stateJwt = queryPairs.stream()
                                          .filter(pair -> pair.getName().equals("state"))
                                          .map(NameValuePair::getValue)
                                          .findFirst()
                                          .orElseThrow(() -> new AssertionError(
                                                  "No state parameter in login redirect URL."));

        final String base64EncodedDevSigningKey = "VGhlcmUgb25jZSB3YXMgYSBsYW5ndWFnZSBjYWxsZWQgYmFzaApJdCdzIHNlbWFudGljcyB3ZXJlIG9mdGVuIHF1aXRlIHJhc2gKQnV0IGl0IHdvcmtlZCwgbW9yZSBvciBsZXNzCkV2ZW4gdGhvdWdoIGl0J3MgYSBtZXNzClNvIEkgZ3Vlc3MgaXQgc3RheXMgb3V0IG9mIHRoZSB0cmFzaAo=";
        Jwts.parser()
            .setSigningKey(base64EncodedDevSigningKey)
            .parseClaimsJws(stateJwt);
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
                .get("/dam/1/v1alpha/dnastack/resources")
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
                .get("/identity")
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

    @Data
    static class CliLoginResponse {
        private String token;
    }
}
