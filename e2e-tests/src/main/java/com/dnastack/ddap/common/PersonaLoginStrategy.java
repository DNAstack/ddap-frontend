package com.dnastack.ddap.common;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

import static com.dnastack.ddap.common.AbstractBaseE2eTest.ddapBasicAuthHeader;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class PersonaLoginStrategy implements LoginStrategy {
    @Override
    public CookieStore performPersonaLogin(String personaName, String realmName, String... scopes) throws IOException {
        final CookieStore cookieStore = new BasicCookieStore();
        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        final String scopeString = (scopes.length == 0) ? "" : "&scope=" + String.join("+", scopes);
        HttpGet request = new HttpGet(String.format("%s/api/v1alpha/%s/identity/login?persona=%s%s", AbstractBaseE2eTest.DDAP_BASE_URL, realmName, personaName, scopeString));
        request.setHeader(HttpHeaders.AUTHORIZATION, ddapBasicAuthHeader());

        HttpResponse response = httpclient.execute(request);

        String responseBody = EntityUtils.toString(response.getEntity());
        assertThat("Response body: " + responseBody, response.getStatusLine().getStatusCode(), is(200));

        return cookieStore;
    }
}
