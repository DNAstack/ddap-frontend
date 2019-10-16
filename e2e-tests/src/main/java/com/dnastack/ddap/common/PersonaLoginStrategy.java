package com.dnastack.ddap.common;

import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.openqa.selenium.WebDriver;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.dnastack.ddap.common.AbstractBaseE2eTest.*;
import static com.dnastack.ddap.common.util.WebDriverUtil.getUrlWithBasicCredentials;
import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertTrue;

public class PersonaLoginStrategy implements LoginStrategy {

    private static final Pattern STATE_PATTERN = Pattern.compile("\\s*let\\s+state\\s*=\\s*\"([^\"]+)\"");
    private static final Pattern PATH_PATTERN = Pattern.compile("\\s*let\\s+path\\s*=\\s*\"([^\"]+)\"");

    @Override
    public CookieStore performPersonaLogin(String personaName, String realmName, String... scopes) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        final String scopeString = (scopes.length == 0) ? "" : "&scope=" + String.join("+", scopes);
        final String path;
        final String state;

        {
            HttpGet request = new HttpGet(String.format("%s/api/v1alpha/%s/identity/login?loginHint=persona:%s%s", DDAP_BASE_URL, realmName, personaName, scopeString));
        addDdapBasicAuthHeader(request);

            HttpResponse response = httpclient.execute(request);

            String responseBody = EntityUtils.toString(response.getEntity());
            assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

            final Matcher pathMatcher = PATH_PATTERN.matcher(responseBody);
            final Matcher stateMatcher = STATE_PATTERN.matcher(responseBody);
            assertTrue(responseBody, pathMatcher.find());
            assertTrue(responseBody, stateMatcher.find());

            path = pathMatcher.group(1);
            state = stateMatcher.group(1);
        }

        {
            final HttpGet request = new HttpGet(String.format("%s%s?state=%s&agree=y", IC_BASE_URL, path, state));
            addDdapBasicAuthHeader(request);

            final HttpResponse response = httpclient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());
            final String responseMessage = "Headers: " + Arrays.toString(response.getAllHeaders()) + "\nResponse body: " + responseBody;
            assertThat(responseMessage, response.getStatusLine().getStatusCode(), is(200));
        }

        return cookieStore;
    }

    @Override
    public <T extends AnyDdapPage> T performPersonaLogin(WebDriver driver, TestingPersona persona, String realm, Function<WebDriver, T> pageFactory) {
        driver.get(getUrlWithBasicCredentials(URI.create(DDAP_BASE_URL).resolve(format("/api/v1alpha/%s/identity/login", realm)).toString(), DDAP_USERNAME, DDAP_PASSWORD));
        ICLoginPage icLoginPage = new ICLoginPage(driver);
        return icLoginPage.loginAsPersona(persona, pageFactory);
    }

}
