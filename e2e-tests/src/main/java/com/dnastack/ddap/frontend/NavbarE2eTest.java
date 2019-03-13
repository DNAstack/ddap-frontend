package com.dnastack.ddap.frontend;

import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.NavBar;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class NavbarE2eTest extends AbstractFrontendE2eTest {

    private static final Map<NavBar.NavItem, List<String>> DEFAULT_PAGE_ITEMS = pageItems();
    private static final Map<NavBar.NavItem, List<String>> pageItems() {
        Map<NavBar.NavItem, List<String>> map = new HashMap<>();
        map.put(NavBar.NavItem.RESOURCES,
                Arrays.asList("allOfUs", "ga4gh-apis"));
        map.put(NavBar.NavItem.PERSONAS,
                Arrays.asList("nci_researcher", "john"));
        map.put(NavBar.NavItem.CLIENTS,
                Arrays.asList("craig_test", "dnastack_fe", "test_client", "test_page"));
        map.put(NavBar.NavItem.TRUSTED_SOURCES,
                Arrays.asList("elixir_institutes", "nih_institutes"));
        map.put(NavBar.NavItem.DEFINITIONS,
                Arrays.asList("ga4gh.AcceptedTermsAndPolicies", "ga4gh.ControlledAccessGrants"));
        map.put(NavBar.NavItem.SERVICE_TEMPLATES,
                Arrays.asList("bigquery", "gcs"));
        map.put(NavBar.NavItem.RULES,
                Arrays.asList("GRU", "bona_fide", "ethics"));
        map.put(NavBar.NavItem.PASSPORTS,
                Arrays.asList("dbGaP", "elixir", "playgroundIC"));

        return map;
    }

    private WebElement findNavItemTitle(String title) {
        return driver.findElement(By.xpath(format("//mat-panel-title[contains(text(), '%s')]", title)));
    }

    private WebElement findNavItemDescription(String description) {
        return driver.findElement(By.xpath(format("//mat-panel-description[contains(text(), '%s')]", description)));
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/navbarE2eTestConfig.json");
        setupRealmConfig("nci_researcher", testConfig, REALM);
    }

    @Test
    public void verifyResources() {
        NavBar.NavItem pageId = NavBar.NavItem.RESOURCES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyPersonas() {
        NavBar.NavItem pageId = NavBar.NavItem.PERSONAS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyClients() {
        NavBar.NavItem pageId = NavBar.NavItem.CLIENTS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyTrustedSources() {
        NavBar.NavItem pageId = NavBar.NavItem.TRUSTED_SOURCES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);

        // make sure the array of sources are displayed too
        findNavItemDescription("https://ga4gh.elixir-czech.org/claims");
        findNavItemDescription("https://dbgap.nlm.nih.gov/aa");
        findNavItemDescription("https://nci.nih.org");
        findNavItemDescription("https://institute1.nih.gov");
    }

    @Test
    public void verifyDefinitions() {
        NavBar.NavItem pageId = NavBar.NavItem.DEFINITIONS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyServiceTemplates() {
        NavBar.NavItem pageId = NavBar.NavItem.SERVICE_TEMPLATES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyRules() {
        NavBar.NavItem pageId = NavBar.NavItem.RULES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyPassports() {
        NavBar.NavItem pageId = NavBar.NavItem.PASSPORTS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(this::findNavItemTitle);
    }

    @Test
    public void verifyIdentity() {
        ddapPage.getNavBar()
                .goToAndCheckForTitle(NavBar.NavItem.IDENTITY);

        driver.findElement(By.xpath("//div[contains(text(), 'nci_researcher@nci.nih.gov')]"));
    }

    @Test
    public void checkForProfileName() {
        final String usernameXpath = "//*[@data-se='nav-account']//h4[contains(text(), 'NCI Researcher')]";

        driver.findElement(By.xpath(usernameXpath)).getText();
    }

}
