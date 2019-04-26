package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import com.google.common.collect.ImmutableMap;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Map;

import static java.lang.String.format;

public class NavBar {
    private WebDriver driver;
    private Map<NavItem, String> NAV_SELECTOR = ImmutableMap.<NavItem, String>builder()
        .put(NavItem.DATA, "nav-data")
        .put(NavItem.RESOURCES, "nav-resources")
        .put(NavItem.PERSONAS, "nav-test-personas")
        .put(NavItem.IDENTITY, "nav-identity")
        .put(NavItem.CLIENTS, "nav-client-applications")
        .put(NavItem.TRUSTED_SOURCES, "nav-trusted-sources")
        .put(NavItem.DEFINITIONS, "nav-claim-definitions")
        .put(NavItem.SERVICE_TEMPLATES, "nav-service-templates")
        .put(NavItem.RULES, "nav-access-policies")
        .put(NavItem.PASSPORTS, "nav-passport-issuers")
        .put(NavItem.IC_PANEL, "nav-ic-panel")
        .put(NavItem.IC_IDENTITY_PROVIDERS, "nav-ic-identity-providers")
        .put(NavItem.IC_CLIENTS, "nav-ic-clients")
        .put(NavItem.IC_OPTIONS, "nav-ic-options")
        .build();
    private Map<NavItem, String> PAGE_TITLE = ImmutableMap.<NavItem, String>builder()
        .put(NavItem.RESOURCES, "Resource")
        .put(NavItem.PERSONAS, "Test Personas")
        .put(NavItem.IDENTITY, "My Identity")
        .put(NavItem.CLIENTS, "Client Applications")
        .put(NavItem.TRUSTED_SOURCES, "Trusted Sources")
        .put(NavItem.DEFINITIONS, "Claim Definitions")
        .put(NavItem.SERVICE_TEMPLATES, "Service Templates")
        .put(NavItem.RULES, "Access Policies")
        .put(NavItem.PASSPORTS, "Passport Issuers")
        .put(NavItem.IC_IDENTITY_PROVIDERS, "Identity Providers")
        .put(NavItem.IC_CLIENTS, "Clients")
        .put(NavItem.IC_OPTIONS, "Options")
        .build();

    public enum NavItem {
        DATA,
        IC_PANEL,
        IC_IDENTITY_PROVIDERS,
        IC_CLIENTS,
        IC_OPTIONS,
        RESOURCES,
        PERSONAS,
        IDENTITY,
        CLIENTS,
        TRUSTED_SOURCES,
        DEFINITIONS,
        SERVICE_TEMPLATES,
        RULES,
        PASSPORTS
    }

    public NavBar(WebDriver driver) {
        this.driver = driver;

        PAGE_TITLE.values()
                .forEach(pageTitle -> driver.findElement(By.xpath(format("//*[contains(text(), '%s')]", pageTitle))));
    }

    public NavBar goToAndCheckForTitle(NavItem pageId) {
        driver.findElement(DdapBy.se(NAV_SELECTOR.get(pageId))).click();
        driver.findElement(By.xpath("//h2[contains(text(), '" + PAGE_TITLE.get(pageId) + "')]"));

        return new NavBar(driver);
    }

    public NavBar goTo(NavItem pageId) {
        driver.findElement(DdapBy.se(NAV_SELECTOR.get(pageId))).click();

        return new NavBar(driver);
    }

    public AdminListPage goToAdmin(NavItem pageId) {
        driver.findElement(DdapBy.se(NAV_SELECTOR.get(pageId))).click();

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
