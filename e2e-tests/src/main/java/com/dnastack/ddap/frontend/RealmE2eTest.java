package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.fragments.ConfirmationRealmChangeDialog;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.TestingPersona;
import org.junit.Assume;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;

@SuppressWarnings("Duplicates")
public class RealmE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(RealmE2eTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        boolean isSandbox = Boolean.parseBoolean(optionalEnv("E2E_SANDBOX", "false"));
        Assume.assumeTrue(isSandbox);
        final String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig(TestingPersona.ADMINISTRATOR, testConfig, "1", REALM);

        ICLoginPage icLoginPage = startLogin(REALM);
        ddapPage = icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void realmSelectorShouldShowCurrentRealm() {
        assertThat(ddapPage.getNavBar().getRealm(), is(REALM));
    }

    @Test
    public void testRealmChangeAndAcceptConfirmationDialog() {
        String otherRealm = "test_other_realm_" + System.currentTimeMillis();
        assertThat("this test is pointless unless we start on a different realm than we're going to!",
            ddapPage.getNavBar().getRealm(), is(not(otherRealm)));

        ConfirmationRealmChangeDialog confirmationRealmChangeDialog = ddapPage.getNavBar().setRealm(otherRealm);
        // Login happens automatically because we are using personas and we hint to the IC how to log us in to the new realm.
        AnyDdapPage anyPage = confirmationRealmChangeDialog.confirmChangeRealmDialog();

        // Wrap this with large timeout because redirect to IC and back happens here
        new WebDriverWait(driver, 10)
            .ignoring(AssertionError.class)
            .ignoring(StaleElementReferenceException.class)
            .until(d -> {
                assertThat(ddapPage.getNavBar().getRealm(), is(otherRealm));
                return true;
            });
    }

    @Test
    public void testRealmChangeAndCancelConfirmationDialog() {
        String otherRealm = "test_other_realm_" + System.currentTimeMillis();
        assertThat("this test is pointless unless we start on a different realm than we're going to!",
            ddapPage.getNavBar().getRealm(), is(not(otherRealm)));

        ConfirmationRealmChangeDialog confirmationRealmChangeDialog = ddapPage.getNavBar().setRealm(otherRealm);
        AnyDdapPage ddapPage = confirmationRealmChangeDialog.cancelChangeRealmDialog();

        // Wrap this with large timeout because redirect to IC and back happens here
        new WebDriverWait(driver, 10)
            .ignoring(AssertionError.class)
            .until(d -> {
                assertThat(ddapPage.getNavBar().getRealm(), is(not(otherRealm)));
                return true;
            });
    }
}
