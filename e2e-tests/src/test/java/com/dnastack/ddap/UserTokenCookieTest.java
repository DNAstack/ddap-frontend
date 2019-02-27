package com.dnastack.ddap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import org.junit.Test;

import java.time.Instant;
import java.util.Base64;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.isOneOf;

public class UserTokenCookieTest extends BaseE2eTest {


    @Test
    public void damResponsesShouldClearExpiredUserTokenCookies() throws Exception {
        String expiredUserTokenCookie = fakeUserToken(Instant.now().minusSeconds(10));

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("user_token", expiredUserTokenCookie)
        .when()
            .get("/dam/v1alpha/resources/resource-name/views/view-name")
        .then()
            .log().body()
            .log().ifValidationFails()
            .statusCode(isOneOf(401, 404))
            .cookie("user_token", "expired");
        // @formatter:on
    }

    private String fakeUserToken(Instant exp) throws JsonProcessingException {
        // Note this will only work so long as DDAP frontend uses unencrypted DAM access tokens as cookie value
        ObjectMapper jsonMapper = new ObjectMapper();
        Base64.Encoder b64Encoder = Base64.getUrlEncoder().withoutPadding();

        Map<String, Object> header = ImmutableMap.of(
                "typ", "JWT",
                "alg", "none");
        Map<String, Object> body = ImmutableMap.of(
                "exp", exp.getEpochSecond());

        return b64Encoder.encodeToString(jsonMapper.writeValueAsBytes(header)) +
                "." +
                b64Encoder.encodeToString(jsonMapper.writeValueAsBytes(body)) +
                ".";
    }
}
