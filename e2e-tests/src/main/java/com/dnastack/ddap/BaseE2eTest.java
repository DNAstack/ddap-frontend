package com.dnastack.ddap;

import io.restassured.RestAssured;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.util.EntityUtils;
import org.junit.Before;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;

public class BaseE2eTest {

    static final String DDAP_USERNAME = requiredEnv("E2E_BASIC_USERNAME");
    static final String DDAP_PASSWORD = requiredEnv("E2E_BASIC_PASSWORD");
    static final String DDAP_BASE_URL = requiredEnv("E2E_BASE_URI");
    static final String DDAP_TEST_REALM_NAME_PREFIX = requiredEnv("E2E_TEST_REALM");

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

    protected void setupRealmConfig(String personaName, String config, String realmName) throws IOException {
        final String modificationPayload = format("{ \"item\": %s }", config);
        final CookieStore cookieStore = performPersonaLogin("nci_researcher", realmName);

        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpPut request = new HttpPut(format("%s/dam/v1alpha/%s/config?persona=nci_researcher", DDAP_BASE_URL, realmName, personaName));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());
        request.setEntity(new StringEntity(modificationPayload));

        final HttpResponse response = httpclient.execute(request);

        assertThat("Unable to set realm config. Response:\n" + EntityUtils.toString(response.getEntity()),
                   response.getStatusLine().getStatusCode(),
                   allOf(greaterThanOrEqualTo(200), lessThan(300)));
    }

    protected String loadTemplate(String resourcePath) {
        final String resourceTemplate;
        try (InputStream is = getClass().getResourceAsStream(resourcePath)) {
            final StringWriter writer = new StringWriter();
            IOUtils.copy(is, writer, Charset.forName("UTF-8"));
            resourceTemplate = writer.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to load test resource template.", e);
        }
        return resourceTemplate;
    }

    protected String fetchRealPersonaIcToken(String personaName, String realmName) throws IOException {
        return fetchRealPersonaToken(personaName, "ic_token", realmName);
    }

    protected String fetchRealPersonaDamToken(String personaName, String realmName) throws IOException {
        return fetchRealPersonaToken(personaName, "dam_token", realmName);
    }

    private String fetchRealPersonaToken(String personaName, String tokenCookieName, String realmName) throws IOException {
        final CookieStore cookieStore = performPersonaLogin(personaName, realmName);

        BasicClientCookie icTokenCookie = (BasicClientCookie) cookieStore.getCookies().stream()
                .filter(c -> tokenCookieName.equals(c.getName()))
                .findFirst()
                .orElse(null);

        assertThat(icTokenCookie, notNullValue());

        // Require cookies to be marked as secure unless we're testing on localhost
        if (!DDAP_BASE_URL.startsWith("http://localhost:")) {
            assertThat("It looks like DDAP_COOKIES_SECURE=true isn't set on this deployment",
                    icTokenCookie.containsAttribute("secure"), is(true));
            assertThat(icTokenCookie.getAttribute("secure"), nullValue());
        }

        assertThat(icTokenCookie.containsAttribute("httponly"), is(true));
        assertThat(icTokenCookie.getAttribute("httponly"), nullValue());

        return icTokenCookie.getValue();
    }

    private CookieStore performPersonaLogin(String personaName, String realmName) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpGet request = new HttpGet(format("%s/api/v1alpha/%s/identity/login?persona=%s", DDAP_BASE_URL, realmName, personaName));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

        HttpResponse response = httpclient.execute(request);

        String responseBody = EntityUtils.toString(response.getEntity());
        assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

        return cookieStore;
    }

    protected String ddapBasicAuthHeader() {
        String auth = DDAP_USERNAME + ":" + DDAP_PASSWORD;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.ISO_8859_1));
        return "Basic " + new String(encodedAuth);
    }
}
