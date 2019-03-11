package com.dnastack.ddap.common.page;

import static java.lang.String.format;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class NavBar {
    private WebDriver driver;
    private Map<NavItem, String> NAV_SELECTOR = new HashMap() {{
        put(NavItem.RESOURCES, "nav-resources");
        put(NavItem.IDENTITIES, "nav-personas");
        put(NavItem.IDENTITY, "nav-identity");
        put(NavItem.CLIENTS, "nav-clients");
        put(NavItem.CLAIMS, "nav-claims");
        put(NavItem.DEFINITIONS, "nav-definitions");
        put(NavItem.GRANTS, "nav-grants");
        put(NavItem.RULES, "nav-rules");
        put(NavItem.PASSPORTS, "nav-passports");
    }};

    private Map<NavItem, String> PAGE_TITLE = new HashMap() {{
        put(NavItem.RESOURCES, "Resource");
        put(NavItem.IDENTITIES, "Personas");
        put(NavItem.IDENTITY, "My Identity");
        put(NavItem.CLIENTS, "Clients");
        put(NavItem.CLAIMS, "Claims");
        put(NavItem.DEFINITIONS, "Definitions");
        put(NavItem.GRANTS, "Grants");
        put(NavItem.RULES, "Rules");
        put(NavItem.PASSPORTS, "Passports");
    }};

    public enum NavItem {
        RESOURCES,
        IDENTITIES,
        IDENTITY,
        CLIENTS,
        CLAIMS,
        DEFINITIONS,
        GRANTS,
        RULES,
        PASSPORTS
    }

    public NavBar(WebDriver driver) {
        this.driver = driver;

        Stream.of("Resources", "Claims", "Rules", "Clients", "Identities")
              .forEach(item -> driver.findElement(By.xpath(format("//*[contains(text(), '%s')]", item))));
    }

    public NavBar goTo(NavItem pageId) {
        driver.findElement(By.xpath("//*[@data-se=\"" + NAV_SELECTOR.get(pageId) + "\"]")).click();
        driver.findElement(By.xpath("//h2[contains(text(), '" + PAGE_TITLE.get(pageId) + "')]"));

        return new NavBar(driver);
    }
}
