package com.dnastack.ddap.common;

import com.dnastack.ddap.common.page.AnyDdapPage;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.dnastack.ddap.common.AbstractBaseE2eTest.*;
import static com.dnastack.ddap.common.util.WebDriverUtil.getUrlWithBasicCredentials;
import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertTrue;

@AllArgsConstructor
public class WalletLoginStrategy implements LoginStrategy {

    private static final Pattern STATE_PATTERN = Pattern.compile("\\s*let\\s+state\\s*=\\s*\"([^\"]+)\"");
    private static final Pattern PATH_PATTERN = Pattern.compile("\\s*let\\s+path\\s*=\\s*\"([^\"]+)\"");
    private static final String[] DEFAULT_SCOPES = new String[] {"openid",  "ga4gh", "account_admin", "identities"};

    private Map<String, LoginInfo> personalAccessTokens;
    private String walletUrl;
    private String icUrl;

    @Override
    public CookieStore performPersonaLogin(String personaName, String realmName, String... scopes) throws IOException {
        final LoginInfo loginInfo = personalAccessTokens.get(personaName);
        final CookieStore cookieStore = new BasicCookieStore();
        final BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(DDAP_USERNAME, DDAP_PASSWORD));
        final HttpClient httpclient = HttpClientBuilder.create()
                                                       .setDefaultCookieStore(cookieStore)
                                                       .setDefaultCredentialsProvider(credentialsProvider)
                                                       .build();
        {
            final String scopeString = (scopes.length == 0) ? "" : "&scope=" + String.join("+", scopes);
            HttpGet request = new HttpGet(String.format("%s/api/v1alpha/%s/identity/login?loginHint=wallet:%s%s", DDAP_BASE_URL, realmName, loginInfo.getEmail(), scopeString));
            request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

            final HttpResponse response = httpclient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());
            assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));
        }

        final String path;
        final String state;
        {
            final HttpGet request = new HttpGet(String.format("%s/login/token?token=%s", walletUrl, loginInfo.getPersonalAccessToken()));

            final HttpResponse response = httpclient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());
            final String responseMessage = "Headers: " + Arrays.toString(response.getAllHeaders()) + "\nResponse body: " + responseBody;
            assertThat(responseMessage, response.getStatusLine().getStatusCode(), is(200));

            /*
             There is a form for consenting to sharing claims with DDAP that must be clicked. It contains a CSRF
             token in the page within a JavaScript function. This was a quick way to workaround the issue but it is brittle.
             We need to figure out a proper way for test users to log in non-interactively in the DAM.
             */
            final Matcher pathMatcher = PATH_PATTERN.matcher(responseBody);
            final Matcher stateMatcher = STATE_PATTERN.matcher(responseBody);

            assertTrue(responseBody, pathMatcher.find());
            assertTrue(responseBody, stateMatcher.find());

            path = pathMatcher.group(1);
            state = stateMatcher.group(1);
        }
        {
            final HttpGet request = new HttpGet(String.format("%s%s?state=%s&agree=y", icUrl, path, state));
            System.out.println("URL: " + request.getURI());

            final HttpResponse response = httpclient.execute(request);

            String responseBody = EntityUtils.toString(response.getEntity());
            final String responseMessage = "Headers: " + Arrays.toString(response.getAllHeaders()) + "\nResponse body: " + responseBody;
            assertThat(responseMessage, response.getStatusLine().getStatusCode(), is(200));
        }

        return cookieStore;
    }

    @Override
    public <T extends AnyDdapPage> T performPersonaLogin(WebDriver driver, TestingPersona persona, String realmName, Function<WebDriver, T> pageFactory) throws IOException {
        final CookieStore cookieStore = performPersonaLogin(persona.getId(), realmName, DEFAULT_SCOPES);
        final Set<String> cookieNames = new HashSet<>(Arrays.asList("dam_token", "ic_token", "refresh_token"));

        // Need to navigate to site before setting cookie
        driver.get(getUrlWithBasicCredentials(URI.create(DDAP_BASE_URL).resolve(format("/%s/data", realmName)).toString(), DDAP_USERNAME, DDAP_PASSWORD));
        cookieStore.getCookies()
                   .stream()
                   .filter(c -> cookieNames.contains(c.getName()))
                   .forEach(cookie -> {
                       driver.manage().deleteCookieNamed(cookie.getName());
                       System.out.printf("Adding cookie to selenium: Cookie(name=%s, domain=%s, path=%s, expiry=%s, secure=%b", cookie.getName(), cookie.getDomain(), cookie.getPath(), cookie.getExpiryDate(), cookie.isSecure());
                       final Cookie browserCookie = new Cookie(cookie.getName(), cookie.getValue(), cookie.getDomain(), cookie.getPath(), cookie.getExpiryDate(), cookie.isSecure());
                       driver.manage().addCookie(browserCookie);
                   });
        driver.navigate().refresh();

        return pageFactory.apply(driver);
    }

    @Value
    static class LoginInfo {
        String email;
        String personalAccessToken;
    }
}
