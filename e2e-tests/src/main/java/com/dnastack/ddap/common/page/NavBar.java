package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Arrays;
import java.util.stream.Stream;

import static java.lang.String.format;

public class NavBar {
    private WebDriver driver;

    public enum NavItem {
        DATA("Explore Data", "nav-data"),
        IC_PANEL(null, "nav-ic-panel"),
        IC_IDENTITY_PROVIDERS("Identity Providers", "nav-ic-identity-providers"),
        IC_CLIENTS("Clients", "nav-ic-clients"),
        IC_OPTIONS("Options", "nav-ic-options"),
        RESOURCES("Resource", "nav-resources"),
        PERSONAS("Test Personas", "nav-test-personas"),
        IDENTITY("My Identity", "nav-identity"),
        CLIENTS("Client Applications", "nav-client-applications"),
        TRUSTED_SOURCES("Trusted Sources", "nav-trusted-sources"),
        DEFINITIONS("Claim Definitions", "nav-claim-definitions"),
        SERVICE_TEMPLATES("Service Templates", "nav-service-templates"),
        RULES("Access Policies", "nav-access-policies"),
        PASSPORTS("Passport Issuers", "nav-passport-issuers");

        public final String title;
        public final String selector;

        NavItem(String title, String selector) {
            this.title = title;
            this.selector = selector;
        }
    }

    public NavBar(WebDriver driver) {
        this.driver = driver;

        // We might not be on an admin page. Only assert basic navbar links
        Stream.of(NavItem.DATA, NavItem.IDENTITY)
              .map(navItem -> navItem.title)
              .forEach(pageTitle -> driver.findElement(By.xpath(format("//*[contains(text(), '%s')]", pageTitle))));
    }

    public void assertAdminNavBar() {
        Arrays.stream(NavItem.values())
              .map(navItem -> navItem.title)
              .forEach(pageTitle -> driver.findElement(By.xpath(format("//*[contains(text(), '%s')]", pageTitle))));
    }

    public NavBar goToAndCheckForTitle(NavItem navItem) {
        driver.findElement(DdapBy.se(navItem.selector)).click();
        driver.findElement(By.xpath("//h2[contains(text(), '" + navItem.title + "')]"));

        return new NavBar(driver);
    }

    public NavBar goTo(NavItem navItem) {
        driver.findElement(DdapBy.se(navItem.selector)).click();

        return new NavBar(driver);
    }

    public AdminListPage goToAdmin(NavItem navItem) {
        driver.findElement(DdapBy.se(navItem.selector)).click();

        return new AdminListPage(driver);
    }

    private WebElement getRealmInput() {
        return driver.findElement(DdapBy.se("realm-input"));
    }

    public ConfirmationRealmChangeDialog setRealm(String targetRealm) {
        WebElement realmInput = getRealmInput();

        realmInput.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.BACK_SPACE);
        realmInput.sendKeys(targetRealm, Keys.RETURN);

        return new ConfirmationRealmChangeDialog(driver);
    }

    public String getRealm() {
        WebElement realmInput = getRealmInput();
        return realmInput.getAttribute("value");
    }

    public ICLoginPage logOut() {
        driver.findElement(DdapBy.se("nav-logout")).click();
        return new ICLoginPage(driver);
    }

}
