package com.dnastack.ddap.common;

import com.dnastack.ddap.common.page.AnyDdapPage;
import org.apache.http.client.CookieStore;
import org.openqa.selenium.WebDriver;

import java.io.IOException;
import java.util.function.Function;

public interface LoginStrategy {
    CookieStore performPersonaLogin(String personaName, String realmName, String... scopes) throws IOException;
    <T extends AnyDdapPage> T performPersonaLogin(WebDriver driver, TestingPersona persona, String realmName, Function<WebDriver, T> pageFactory) throws IOException;
}
