package com.dnastack.ddap.common;

import org.apache.http.client.CookieStore;

import java.io.IOException;

public interface LoginStrategy {
    CookieStore performPersonaLogin(String personaName, String realmName, String... scopes) throws IOException;
}
