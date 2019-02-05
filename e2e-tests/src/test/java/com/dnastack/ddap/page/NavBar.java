package com.dnastack.ddap.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import static java.lang.String.format;

public class NavBar {
    private WebDriver driver;
    private Map<NavItem, String> navSelector = new HashMap() {{
        put(NavItem.Resources, "nav-resources");
        put(NavItem.Identities, "nav-personas");
        put(NavItem.Clients, "nav-clients");
        put(NavItem.Claims, "nav-claims");
        put(NavItem.Definitions, "nav-definitions");
        put(NavItem.Grants, "nav-grants");
        put(NavItem.Rules, "nav-rules");
        put(NavItem.Passports, "nav-passports");
    }};

    private Map<NavItem, String> pageTitle = new HashMap() {{
        put(NavItem.Resources, "Resource");
        put(NavItem.Identities, "Personas");
        put(NavItem.Clients, "Clients");
        put(NavItem.Claims, "Claims");
        put(NavItem.Definitions, "Definitions");
        put(NavItem.Grants, "Grants");
        put(NavItem.Rules, "Rules");
        put(NavItem.Passports, "Passports");
    }};

    public enum NavItem {
        Resources,
        Identities,
        Clients,
        Claims,
        Definitions,
        Grants,
        Rules,
        Passports
    }

    public NavBar(WebDriver driver) {
        this.driver = driver;

        Stream.of("Resources", "Claims", "Rules", "Clients", "Identities")
              .forEach(item -> driver.findElement(By.xpath(format("//*[contains(text(), '%s')]", item))));
    }

    public NavBar goTo(NavItem pageId) {
        driver.findElement(By.xpath("//*[@data-se=\"" + navSelector.get(pageId) + "\"]")).click();
        driver.findElement(By.xpath("//h2[contains(text(), '" + pageTitle.get(pageId) + "')]"));

        return new NavBar(driver);
    }
}
