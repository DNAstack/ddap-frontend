package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.TestingPersona;
import com.dnastack.ddap.common.fragments.NavBar;
import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.util.DdapBy;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;

import static com.dnastack.ddap.common.fragments.NavBar.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertFalse;

@SuppressWarnings("Duplicates")
public class NavbarE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(NavbarE2eTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);

        ICLoginPage icLoginPage = startLogin(REALM);
        ddapPage = icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void verifyAdminAccess() {
        ICLoginPage icLoginPage = ddapPage.getNavBar().logOut();
        icLoginPage.loginAsAdministrator(AdminDdapPage::new);

        ddapPage.getNavBar()
                .assertAdminNavBar();

        icLoginPage = ddapPage.getNavBar().logOut();
        icLoginPage.loginAsPersona(TestingPersona.USER_WITHOUT_ACCESS, AnyDdapPage::new);

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
    public void logoutShouldGoToIcLoginForCurrentRealmAndRemoveCookies() {
        // check if cookies are present on landing page
        assertThat(driver.manage().getCookieNamed("dam_token"), notNullValue());
        assertThat(driver.manage().getCookieNamed("ic_token"), notNullValue());
        assertThat(driver.manage().getCookieNamed("refresh_token"), notNullValue());

        ICLoginPage icLoginPage = ddapPage.getNavBar().logOut();
        assertThat(icLoginPage.getRealm(), is(REALM));

        // check if cookies are not present on landing page without logging in
        driver.get(getUrlWithBasicCredentials(DDAP_BASE_URL));
        assertThat(driver.manage().getCookieNamed("dam_token"), nullValue());
        assertThat(driver.manage().getCookieNamed("ic_token"), nullValue());
        assertThat(driver.manage().getCookieNamed("refresh_token"), nullValue());
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
