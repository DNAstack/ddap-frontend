package com.dnastack.ddap;

import io.restassured.RestAssured;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Before;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.Assert.fail;

public class BaseE2eTest {

    static final String DDAP_USERNAME = requiredEnv("E2E_BASIC_USERNAME");
    static final String DDAP_PASSWORD = requiredEnv("E2E_BASIC_PASSWORD");
    static final String DDAP_BASE_URL = requiredEnv("E2E_BASE_URI");

    @Before
    public void setUp() {
        RestAssured.baseURI = DDAP_BASE_URL;
    }

    protected static String requiredEnv(String name) {
        String val = System.getenv(name);
        if (val == null) {
            fail("Environnment variable `" + name + "` is required");
        }
        return val;
    }

    protected static String optionalEnv(String name, String defaultValue) {
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }

    protected String fetchRealPersonaIcToken(String personaName) throws IOException {
        return fetchRealPersonaToken(personaName, "ic_token");
    }

    protected String fetchRealPersonaDamToken(String personaName) throws IOException {
        return fetchRealPersonaToken(personaName, "dam_token");
    }

    private String fetchRealPersonaToken(String personaName, String tokenCookieName) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet request = new HttpGet(format("%s/api/identity/login?persona=%s", DDAP_BASE_URL, personaName));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

        HttpResponse response = httpclient.execute(request);

        String responseBody = EntityUtils.toString(response.getEntity());
        assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

        String icToken = cookieStore.getCookies().stream()
                .filter(c -> {
                    return tokenCookieName.equals(c.getName());
                })
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        assertThat(icToken, notNullValue());

        return icToken;
    }

    protected String ddapBasicAuthHeader() {
        String auth = DDAP_USERNAME + ":" + DDAP_PASSWORD;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.ISO_8859_1));
        return "Basic " + new String(encodedAuth);
    }
}
