package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;

import static com.dnastack.ddap.common.page.NavBar.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.junit.Assert.assertFalse;

@SuppressWarnings("Duplicates")
public class NavbarE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(NavbarE2eTest.class.getSimpleName());

    @Override
    protected String getRealm() {
        return REALM;
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig("administrator", testConfig, "1", REALM);
    }

    @Override
    protected AnyDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void verifyAdminAccess() {
        ICLoginPage icLoginPage = ddapPage.getNavBar().logOut();
        icLoginPage.loginAsAdministrator(AdminDdapPage::new);

        ddapPage.getNavBar()
                .assertAdminNavBar();

        icLoginPage = ddapPage.getNavBar().logOut();
        icLoginPage.loginAsPersona("john", AnyDdapPage::new);

        ddapPage.getNavBar()
                .assertNonAdminNavBar();
        assertThat(ddapPage.getNavBar().existsInNavBar(damResourceLink(DAM_ID)), is(false));
    }

    @Test
    public void checkForProfileName() {
        final String usernameXpath = "//*[@data-se='nav-account']//h4[contains(text(), 'Administrator')]";

        driver.findElement(By.xpath(usernameXpath)).getText();
    }



    @Test
    public void logoutButtonShouldGoToIcLoginForCurrentRealm() {
        ICLoginPage icLoginPage = ddapPage.getNavBar().logOut();

        assertThat(icLoginPage.getRealm(), is(REALM));
    }

    @Test
    public void testDescriptionLinkNavigation() {
        ICLoginPage icLoginPage = ddapPage.getNavBar().logOut();
        icLoginPage.loginAsAdministrator(AdminDdapPage::new);

        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damResourceLink(DAM_ID));
        adminListPage.clickDescriptionLink();
        new WebDriverWait(driver, 3)
                .until(ExpectedConditions.textToBe(DdapBy.se("page-title"), "Access Policies"));
    }

    @Ignore
    @Test
    public void reloadPageToTestIcPanelExpansion() {
        ddapPage.getNavBar()
                .goToAdmin(icClientsLink());

        new WebDriverWait(driver, 10).until(d -> d.findElement(NavBar.icClientsLink().getSelector()).isDisplayed());
        assertFalse(driver.findElement(NavBar.damOptionsLink("1").getSelector()).isDisplayed());

        driver.navigate().refresh();

        new WebDriverWait(driver, 10).until(d -> d.findElement(NavBar.icClientsLink().getSelector()).isDisplayed());
        assertFalse(driver.findElement(NavBar.damOptionsLink("1").getSelector()).isDisplayed());
    }

    @Ignore
    @Test
    public void reloadPageToTestDamPanelExpansion() {
        ddapPage.getNavBar()
                .goToAdmin(damTestPersonaLink("1"));

        new WebDriverWait(driver, 10).until(d -> d.findElement(NavBar.damTestPersonaLink("1").getSelector()).isDisplayed());
        assertFalse(driver.findElement(NavBar.icClientsLink().getSelector()).isDisplayed());

        driver.navigate().refresh();

        new WebDriverWait(driver, 10).until(d -> d.findElement(NavBar.damTestPersonaLink("1").getSelector()).isDisplayed());
        assertFalse(driver.findElement(NavBar.icClientsLink().getSelector()).isDisplayed());
    }

}
