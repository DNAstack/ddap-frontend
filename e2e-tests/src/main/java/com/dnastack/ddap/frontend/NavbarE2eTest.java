package com.dnastack.ddap.frontend;

import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.page.IdentityPage;
import com.dnastack.ddap.common.page.NavBar;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@SuppressWarnings("Duplicates")
public class NavbarE2eTest extends AbstractFrontendE2eTest {

    private static final Map<NavBar.NavItem, List<String>> DEFAULT_PAGE_ITEMS = pageItems();
    private static final Map<NavBar.NavItem, List<String>> pageItems() {
        Map<NavBar.NavItem, List<String>> map = new HashMap<>();
        map.put(NavBar.NavItem.RESOURCES,
                Arrays.asList("All Of Us", "GA4GH APIs"));
        map.put(NavBar.NavItem.PERSONAS,
                Arrays.asList("Dr. Joe", "John Persona", "NCI Researcher"));
        map.put(NavBar.NavItem.CLIENTS,
                Arrays.asList("Billing Test", "DNAstack Front-End", "Test Client", "IC Test Page"));
        map.put(NavBar.NavItem.TRUSTED_SOURCES,
                Arrays.asList("elixir_institutes", "nih_institutes"));
        map.put(NavBar.NavItem.DEFINITIONS,
                Arrays.asList("Elixir Affiliated Country", "Affiliation and Role"));
        map.put(NavBar.NavItem.SERVICE_TEMPLATES,
                Arrays.asList("Beacon Discovery Search", "Google BigQuery", "Google Cloud Storage"));
        map.put(NavBar.NavItem.RULES,
                Arrays.asList("General Research Use", "Bona Fide", "Researcher Ethics Agreement"));
        map.put(NavBar.NavItem.PASSPORTS,
                Arrays.asList("dbGaP", "elixir", "playgroundIC"));
        map.put(NavItem.IC_IDENTITY_PROVIDERS,
                Arrays.asList("Elixir", "eRA Commons", "Google"));
        map.put(NavItem.IC_CLIENTS,
                Arrays.asList("craig_test", "dnastack_fe", "test_client", "test_page"));
        map.put(NavItem.IC_OPTIONS,
                Arrays.asList("Access Token TTL", "Account Name Length", "Authorization Code TTL",
                    "Claim TTL Cap", "Default Passport Token TTL", "Maximum Passport Token TTL", "Refresh Token TTL"
                ));
        return map;
    }

    private WebElement findPanelItemTitle(String title) {
        return driver.findElement(By.xpath(format("//mat-panel-title[contains(text(), '%s')]", title)));
    }

    private WebElement findPanelItemDescription(String description) {
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

        AdminListPage resources = new AdminListPage(driver);
        List<String> resourceTitles = resources.getEntityTitles();
        assertThat(resourceTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(resourceTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyPersonas() {
        NavBar.NavItem pageId = NavBar.NavItem.PERSONAS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage personas = new AdminListPage(driver);
        List<String> personaTitles = personas.getEntityTitles();
        assertThat(personaTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(personaTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyClients() {
        NavBar.NavItem pageId = NavBar.NavItem.CLIENTS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage clients = new AdminListPage(driver);
        List<String> clientTitles = clients.getEntityTitles();
        assertThat(clientTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(clientTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyTrustedSources() {
        NavBar.NavItem pageId = NavBar.NavItem.TRUSTED_SOURCES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage trustedSources = new AdminListPage(driver);
        List<String> trustedSourceTitles = trustedSources.getEntityTitles();
        assertThat(trustedSourceTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(trustedSourceTitles, hasItem(expectedTitle)));

        // make sure the array of sources are displayed too
        findPanelItemDescription("https://ga4gh.elixir-czech.org/claims");
        findPanelItemDescription("https://dbgap.nlm.nih.gov/aa");
        findPanelItemDescription("https://nci.nih.org");
        findPanelItemDescription("https://institute1.nih.gov");
    }

    @Test
    public void verifyDefinitions() {
        NavBar.NavItem pageId = NavBar.NavItem.DEFINITIONS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage definitions = new AdminListPage(driver);
        List<String> definitionTitles = definitions.getEntityTitles();
        assertThat(definitionTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(definitionTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyServiceTemplates() {
        NavBar.NavItem pageId = NavBar.NavItem.SERVICE_TEMPLATES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage serviceTemplates = new AdminListPage(driver);
        List<String> serviceTemplateTitles = serviceTemplates.getEntityTitles();
        assertThat(serviceTemplateTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(serviceTemplateTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyAccessPolicies() {
        NavBar.NavItem pageId = NavBar.NavItem.RULES;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage accessPolicies = new AdminListPage(driver);
        List<String> accessPolicyTitles = accessPolicies.getEntityTitles();
        assertThat(accessPolicyTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(accessPolicyTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyPassports() {
        NavBar.NavItem pageId = NavBar.NavItem.PASSPORTS;
        ddapPage.getNavBar()
                .goToAndCheckForTitle(pageId);

        AdminListPage passports = new AdminListPage(driver);
        List<String> passportTitles = passports.getEntityTitles();
        assertThat(passportTitles, hasSize(greaterThan(3)));
        DEFAULT_PAGE_ITEMS.get(pageId)
            .forEach(expectedTitle -> assertThat(passportTitles, hasItem(expectedTitle)));
    }

    @Test
    public void verifyConnectedIdentityAccounts() {
        driver.findElement(By.xpath("//*[@data-se=\"nav-identity\"]")).click();

        // click through the "log in again" prompt
        driver.switchTo().alert().accept();
        ICLoginPage icLoginPage = new ICLoginPage(driver);

        IdentityPage identityPage = icLoginPage.loginAsNciResearcher(IdentityPage::new);
        assertThat(identityPage.getLinkedIdentities(), hasItem("nci_researcher@nci.nih.gov"));
    }

    @Test
    public void verifyAvailableIdentityAccounts() {
        driver.findElement(By.xpath("//*[@data-se=\"nav-identity\"]")).click();

        // click through the "log in again" prompt
        driver.switchTo().alert().accept();
        ICLoginPage icLoginPage = new ICLoginPage(driver);

        IdentityPage identityPage = icLoginPage.loginAsNciResearcher(IdentityPage::new);
        System.out.println(identityPage.getLinkableIdentities());
        assertThat(identityPage.getLinkableIdentities(), hasItem("<persona>"));
    }

    @Test
    public void verifyICIdentityProviders() {
        ddapPage.getNavBar()
            .goTo(NavItem.IC_PANEL);
        ddapPage.getNavBar()
            .goToAndCheckForTitle(NavItem.IC_IDENTITY_PROVIDERS);

        DEFAULT_PAGE_ITEMS.get(NavItem.IC_IDENTITY_PROVIDERS)
            .forEach(this::findPanelItemTitle);
    }

    @Test
    public void verifyICClients() {
        ddapPage.getNavBar()
            .goTo(NavItem.IC_PANEL);
        ddapPage.getNavBar()
            .goToAndCheckForTitle(NavItem.IC_CLIENTS);

        DEFAULT_PAGE_ITEMS.get(NavItem.IC_CLIENTS)
            .forEach(this::findPanelItemTitle);
    }

    @Test
    public void verifyICOptions() {
        ddapPage.getNavBar()
            .goTo(NavItem.IC_PANEL);
        ddapPage.getNavBar()
            .goToAndCheckForTitle(NavItem.IC_OPTIONS);

        DEFAULT_PAGE_ITEMS.get(NavItem.IC_OPTIONS)
            .forEach(this::findPanelItemTitle);
    }

    @Test
    public void checkForProfileName() {
        final String usernameXpath = "//*[@data-se='nav-account']//h4[contains(text(), 'NCI Researcher')]";

        driver.findElement(By.xpath(usernameXpath)).getText();
    }

    @Test
    public void realmSelectorShouldShowCurrentRealm() {
        assertThat(ddapPage.getNavBar().getRealm(), is(REALM));
    }

    @Test
    public void realmSelectorShouldBeAbleToChangeCurrentRealm() {
        String otherRealm = "test_other_realm_" + System.currentTimeMillis();
        assertThat("this test is pointless unless we start on a different realm than we're going to!",
                ddapPage.getNavBar().getRealm(), is(not(otherRealm)));

        ddapPage.getNavBar().setRealm(otherRealm);

        assertThat(ddapPage.getNavBar().getRealm(), is(otherRealm));
    }

    @Test
    public void logoutButtonShouldGoToIcLoginForCurrentRealm() {
        ICLoginPage icLoginPage = ddapPage.getNavBar().logOut();

        assertThat(icLoginPage.getRealm(), is(REALM));
    }

}
