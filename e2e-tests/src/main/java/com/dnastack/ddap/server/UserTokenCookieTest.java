package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import dam.v1.DamService;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static java.lang.String.format;
import static org.hamcrest.Matchers.isOneOf;
import static org.hamcrest.Matchers.not;

public class UserTokenCookieTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(UserTokenCookieTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        validateProtoBuf(damConfig, DamService.DamConfig.newBuilder());
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);
    }

    @Test
    public void damResponsesShouldClearExpiredUserTokenCookies() throws Exception {
        String expiredUserTokenCookie = fakeUserToken(Instant.now().minusSeconds(10));

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", expiredUserTokenCookie)
        .when()
            .get(damViaDdap("/resources/resource-name/views/view-name"))
        .then()
            .log().body()
            .log().ifValidationFails()
            .statusCode(isOneOf(401, 404))
            .cookie("dam_token", "expired");
        // @formatter:on
    }

    private String damViaDdap(String path) {
        return format("/dam/v1alpha/%s%s", REALM, path);
    }

    @Test
    public void shouldIncludeValidAuthStatusInResponseHeader() throws Exception {
        String unexpiredUserTokenCookie = fakeUserToken(Instant.now().plusSeconds(10));

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", unexpiredUserTokenCookie)
        .when()
            .get(damViaDdap("/resources/resource-name/views/view-name"))
        .then()
            .log().body()
            .log().ifValidationFails()
            .header("X-DDAP-Authenticated", "true");
        // @formatter:on
    }

    @Test
    public void shouldIncludeInvalidAuthStatusInResponseHeader() throws Exception {
        String expiredUserTokenCookie = fakeUserToken(Instant.now().minusSeconds(10));

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", expiredUserTokenCookie)
        .when()
            .get(damViaDdap("/resources/resource-name/views/view-name"))
        .then()
            .log().body()
            .log().ifValidationFails()
            .header("X-DDAP-Authenticated", "false");
        // @formatter:on
    }

    @Test
    public void shouldIncludeMissingAuthStatusInResponseHeader() throws Exception {
        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
        .when()
            .get(damViaDdap("/resources/resource-name/views/view-name"))
        .then()
            .log().body()
            .log().ifValidationFails()
            .header("X-DDAP-Authenticated", "false");
        // @formatter:on
    }

    @Test
    public void shouldBeAbleToAccessICWithAppropriateCookie() throws IOException {
        String validPersonaToken = fetchRealPersonaIcToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("ic_token", validPersonaToken)
        .when()
            .get(icViaDdap("/accounts/-"))
        .then()
            .log().everything()
            .contentType(not("text/html"))
            .statusCode(200);
        // @formatter:on
    }

    private String icViaDdap(String path) {
        return format("/identity/v1alpha/%s%s", REALM, path);
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
