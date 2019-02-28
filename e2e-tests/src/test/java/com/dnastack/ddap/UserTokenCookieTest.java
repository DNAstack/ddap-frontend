package com.dnastack.ddap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

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
            .cookie("dam_token", expiredUserTokenCookie)
        .when()
            .get("/dam/v1alpha/resources/resource-name/views/view-name")
        .then()
            .log().body()
            .log().ifValidationFails()
            .statusCode(isOneOf(401, 404))
            .cookie("dam_token", "expired");
        // @formatter:on
    }

    @Test
    public void shouldIncludeValidAuthStatusInResponseHeader() throws Exception {
        String unexpiredUserTokenCookie = fakeUserToken(Instant.now().plusSeconds(10));

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", unexpiredUserTokenCookie)
        .when()
            .get("/dam/v1alpha/resources/resource-name/views/view-name")
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
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", expiredUserTokenCookie)
        .when()
            .get("/dam/v1alpha/resources/resource-name/views/view-name")
        .then()
            .log().body()
            .log().ifValidationFails()
            .header("X-DDAP-Authenticated", "false");
        // @formatter:on
    }

    @Test
    public void shouldIncludeMissingAuthStatusInResponseHeader() throws Exception {
        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
        .when()
            .get("/dam/v1alpha/resources/resource-name/views/view-name")
        .then()
            .log().body()
            .log().ifValidationFails()
            .header("X-DDAP-Authenticated", "false");
        // @formatter:on
    }

    @Test
    public void shouldBeAbleToAccessICWithAppropriateCookie() throws IOException {
        // TODO [DISCO-2022] this test should create its own realm and populate it with the needed personas!
        String validPersonaToken = fetchRealPersonaIcToken("nci_researcher");

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("ic_token", validPersonaToken)
        .when()
            .get("/identity/v1alpha/accounts/-")
        .then()
            .log().everything()
            .contentType(not("text/html"))
            .statusCode(200);
        // @formatter:on
    }

    private String fetchRealPersonaIcToken(String personaName) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet request = new HttpGet(format("%s/api/identity/login?persona=%s", DDAP_BASE_URL, personaName));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

        HttpResponse response = httpclient.execute(request);

        String responseBody = EntityUtils.toString(response.getEntity());
        assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

        String icToken = cookieStore.getCookies().stream()
                .filter(c -> "ic_token".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        assertThat(icToken, notNullValue());

        return icToken;
    }

    private String ddapBasicAuthHeader() {
        String auth = DDAP_USERNAME + ":" + DDAP_PASSWORD;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.ISO_8859_1));
        return "Basic " + new String(encodedAuth);
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
