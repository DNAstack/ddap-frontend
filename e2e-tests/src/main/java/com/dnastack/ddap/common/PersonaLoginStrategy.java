package com.dnastack.ddap.common;

import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import org.apache.http.HttpHeaders;
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
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.dnastack.ddap.common.AbstractBaseE2eTest.*;
import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class PersonaLoginStrategy implements LoginStrategy {

    protected static final Pattern URL_PARSE_PATTERN = Pattern.compile("^(https?)://(.*)$");

    @Override
    public CookieStore performPersonaLogin(String personaName, String realmName, String... scopes) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        final String scopeString = (scopes.length == 0) ? "" : "&scope=" + String.join("+", scopes);
        HttpGet request = new HttpGet(String.format("%s/api/v1alpha/%s/identity/login?persona=%s%s", DDAP_BASE_URL, realmName, personaName, scopeString));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

        HttpResponse response = httpclient.execute(request);

        String responseBody = EntityUtils.toString(response.getEntity());
        assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

        return cookieStore;
    }

    @Override
    public <T extends AnyDdapPage> T performPersonaLogin(WebDriver driver, TestingPersona persona, String realm, Function<WebDriver, T> pageFactory) {
        driver.get(getUrlWithBasicCredentials(URI.create(DDAP_BASE_URL).resolve(format("/api/v1alpha/%s/identity/login", realm)).toString()));
        ICLoginPage icLoginPage = new ICLoginPage(driver);
        return icLoginPage.loginAsPersona(persona, pageFactory);
    }

    protected static String getUrlWithBasicCredentials(String original) {
        final Matcher matcher = URL_PARSE_PATTERN.matcher(original);
        if (matcher.find()) {
            return format("%s://%s:%s@%s", matcher.group(1), DDAP_USERNAME, DDAP_PASSWORD, matcher.group(2));
        } else {
            throw new IllegalArgumentException("Could not parse url: " + original);
        }
    }
}
