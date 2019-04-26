package com.dnastack.ddap.common;

import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
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
import java.util.Arrays;
import java.util.Base64;
import java.util.stream.Collectors;

import static java.lang.Math.min;
import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;

public abstract class AbstractBaseE2eTest {

    protected static final String DDAP_USERNAME = requiredEnv("E2E_BASIC_USERNAME");
    protected static final String DDAP_PASSWORD = requiredEnv("E2E_BASIC_PASSWORD");
    protected static final String DDAP_BASE_URL = requiredEnv("E2E_BASE_URI");
    protected static final String DDAP_TEST_REALM_NAME_PREFIX = requiredEnv("E2E_TEST_REALM");
    // Current size limit on realm names in DAM
    public static final int REALM_NAME_LIMIT = 40;

    protected static String generateRealmName(String testClassName) {
        final String fullName = format("%s_%s_%s",
                                     DDAP_TEST_REALM_NAME_PREFIX,
                                     testClassName,
                                     System.currentTimeMillis() % 1000);
        return fullName.substring(0, min(REALM_NAME_LIMIT, fullName.length()));
    }

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

    public static String optionalEnv(String name, String defaultValue) {
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }

    protected void validateProtoBuf(String resourceJsonString, Message.Builder builder) {

        try {
            JsonFormat.parser().merge(resourceJsonString, builder);
        } catch(Exception e) {
            throw new IllegalStateException("Failed to parse proto", e);
        }
    }



    protected static void setupRealmConfig(String personaName, String config, String realmName) throws IOException {
        final String modificationPayload = format("{ \"item\": %s }", config);
        final CookieStore cookieStore = performPersonaLogin("nci_researcher", realmName);

        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpPut request = new HttpPut(format("%s/dam/v1alpha/%s/config?persona=%s", DDAP_BASE_URL, realmName, personaName));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());
        request.setEntity(new StringEntity(modificationPayload));

        final HttpResponse response = httpclient.execute(request);
        String responseBody = EntityUtils.toString(response.getEntity());

        assertThat("Unable to set realm config. Response:\n" + responseBody,
                   response.getStatusLine().getStatusCode(),
                   allOf(greaterThanOrEqualTo(200), lessThan(300)));
    }

    protected static String loadTemplate(String resourcePath) {
        final String resourceTemplate;
        try (InputStream is = AbstractBaseE2eTest.class.getResourceAsStream(resourcePath)) {
            final StringWriter writer = new StringWriter();
            IOUtils.copy(is, writer, Charset.forName("UTF-8"));
            resourceTemplate = writer.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to load test resource template.", e);
        }
        return resourceTemplate;
    }

    protected String fetchRealPersonaIcToken(String personaName, String realmName, String ... scopes) throws IOException {
        return fetchRealPersonaToken(personaName, "ic_token", realmName, scopes);
    }

    protected String fetchRealPersonaDamToken(String personaName, String realmName) throws IOException {
        return fetchRealPersonaToken(personaName, "dam_token", realmName);
    }

    private String fetchRealPersonaToken(String personaName, String tokenCookieName, String realmName, String ... scopes) throws IOException {
        final CookieStore cookieStore = performPersonaLogin(personaName, realmName, scopes);

        BasicClientCookie icTokenCookie = (BasicClientCookie) cookieStore.getCookies().stream()
                .filter(c -> tokenCookieName.equals(c.getName()))
                .findFirst()
                .orElse(null);

        assertThat(icTokenCookie, notNullValue());

        // Require cookies to be marked as secure unless we're testing on localhost
        if (!(DDAP_BASE_URL.startsWith("http://localhost:") || DDAP_BASE_URL.startsWith("http://host.docker.internal:"))) {
            assertThat("It looks like DDAP_COOKIES_SECURE=true isn't set on this deployment",
                    icTokenCookie.containsAttribute("secure"), is(true));
            assertThat(icTokenCookie.getAttribute("secure"), nullValue());
        }

        assertThat(icTokenCookie.containsAttribute("httponly"), is(true));
        assertThat(icTokenCookie.getAttribute("httponly"), nullValue());

        return icTokenCookie.getValue();
    }

    private static CookieStore performPersonaLogin(String personaName, String realmName, String ... scopes) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        final String scopeString = (scopes.length == 0) ? "" : "&scope=" + String.join("+", scopes);
        HttpGet request = new HttpGet(format("%s/api/v1alpha/%s/identity/login?persona=%s%s", DDAP_BASE_URL, realmName, personaName, scopeString));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

        HttpResponse response = httpclient.execute(request);

        String responseBody = EntityUtils.toString(response.getEntity());
        assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

        return cookieStore;
    }

    protected static String ddapBasicAuthHeader() {
        String auth = DDAP_USERNAME + ":" + DDAP_PASSWORD;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.ISO_8859_1));
        return "Basic " + new String(encodedAuth);
    }
}
