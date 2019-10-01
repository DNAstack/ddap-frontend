package com.dnastack.ddap.common;

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

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.dnastack.ddap.common.AbstractBaseE2eTest.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertTrue;

@AllArgsConstructor
public class WalletLoginStrategy implements LoginStrategy {

    private static final Pattern STATE_PATTERN = Pattern.compile("\\s*let\\s+state\\s*=\\s*\"([^\"]+)\"");
    private static final Pattern PATH_PATTERN = Pattern.compile("\\s*let\\s+path\\s*=\\s*\"([^\"]+)\"");

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

    @Value
    static class LoginInfo {
        String email;
        String personalAccessToken;
    }
}
