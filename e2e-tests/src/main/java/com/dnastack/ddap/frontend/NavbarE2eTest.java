package com.dnastack.ddap.frontend;

import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.HasNavBar;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.page.NavBar;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;

public class NavbarE2eTest extends AbstractFrontendE2eTest {

    private final static String NAV_ITEM_FORMAT = "//mat-panel-title[contains(text(), '%s')]";
    private final static Map<NavBar.NavItem, List<String>> DEFAULT_PAGE_ITEMS = new HashMap() {{
        put(NavBar.NavItem.RESOURCES,
                Arrays.asList("allOfUs", "ga4gh-apis"));
        put(NavBar.NavItem.IDENTITIES,
                Arrays.asList("nci_researcher", "john"));
        put(NavBar.NavItem.CLIENTS,
                Arrays.asList("craig_test", "dnastack_fe", "test_client", "test_page"));
        put(NavBar.NavItem.CLAIMS,
                Arrays.asList("elixir", "nci", "ustanford"));
        put(NavBar.NavItem.DEFINITIONS,
                Arrays.asList("ga4gh.AcceptedTermsAndPolicies", "ga4gh.ControlledAccessGrants"));
        put(NavBar.NavItem.GRANTS,
                Arrays.asList("bigquery", "gcs"));
        put(NavBar.NavItem.RULES,
                Arrays.asList("GRU", "bona_fide", "ethics"));
        put(NavBar.NavItem.PASSPORTS,
                Arrays.asList("dbGaP", "elixir", "playgroundIC"));
    }};

    private HasNavBar ddapPage;

    @Before
    public void testSetup() {
        if (driver != null) {
            // Ensure that tests with login work independently of eachother.
            driver.manage().deleteAllCookies();
        }
        ICLoginPage icLoginPage = startLogin();
        ddapPage = icLoginPage.loginAsNciResearcher();
    }

    @Test
    public void getDefaultResources() {
        NavBar.NavItem pageId = NavBar.NavItem.RESOURCES;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultIdentities() {
        NavBar.NavItem pageId = NavBar.NavItem.IDENTITIES;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultClients() {
        NavBar.NavItem pageId = NavBar.NavItem.CLIENTS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultClaims() {
        NavBar.NavItem pageId = NavBar.NavItem.CLAIMS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultDefinitions() {
        NavBar.NavItem pageId = NavBar.NavItem.DEFINITIONS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultGrants() {
        NavBar.NavItem pageId = NavBar.NavItem.GRANTS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultRules() {
        NavBar.NavItem pageId = NavBar.NavItem.RULES;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultPassports() {
        NavBar.NavItem pageId = NavBar.NavItem.PASSPORTS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultIdentity() {
        ddapPage.getNavBar()
                .goTo(NavBar.NavItem.IDENTITY);

        driver.findElement(By.xpath("//div[contains(text(), 'nci_researcher@nci.nih.gov')]"));
    }

    @Test
    public void checkForProfileName() {
        String profileSelector = "nav-account";
        String text = driver.findElement(By.xpath("//*[@data-se=\"" + profileSelector + "\"]")).getText();

        assertThat(text, containsString("Craig Voisin"));
    }

}
