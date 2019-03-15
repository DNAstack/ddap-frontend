package com.dnastack.ddap.common.page;

import static java.lang.String.format;

import java.util.Map;

import com.google.common.collect.ImmutableMap;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

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
        .build();

    public enum NavItem {
        DATA,
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
        driver.findElement(By.xpath("//*[@data-se=\"" + NAV_SELECTOR.get(pageId) + "\"]")).click();
        driver.findElement(By.xpath("//h2[contains(text(), '" + PAGE_TITLE.get(pageId) + "')]"));

        return new NavBar(driver);
    }

    public NavBar goTo(NavItem pageId) {
        driver.findElement(By.xpath("//*[@data-se=\"" + NAV_SELECTOR.get(pageId) + "\"]")).click();

        return new NavBar(driver);
    }
}
