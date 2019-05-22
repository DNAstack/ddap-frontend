package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SuppressWarnings("Duplicates")
public class AdminDamOptionsE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig("administrator", testConfig, REALM);
    }

    @Override
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void submitBooleanOptionWronglyWithTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("Read Only Master Realm"));
        adminListPage.submitOption("Read Only Master Realm", "foobar");
        adminListPage.assertError("Read Only Master Realm", 5, containsString("boolean"));
    }

    @Test
    public void submitBooleanOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("Read Only Master Realm"));
        final String oldValue = adminListPage.getOptionValue("Read Only Master Realm");
        adminListPage.submitOption("Read Only Master Realm", oldValue);
        adminListPage.assertNoError("Read Only Master Realm", 5);
    }

    @Test
    public void submitNumberOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("GCP Managed Keys Per Account"));
        final String oldValue = adminListPage.getOptionValue("GCP Managed Keys Per Account");
        adminListPage.submitOption("GCP Managed Keys Per Account", oldValue);
        adminListPage.assertNoError("GCP Managed Keys Per Account", 5);
    }

    @Test
    public void submitStringOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("GCP Service Account Project"));
        final String oldValue = adminListPage.getOptionValue("GCP Service Account Project");
        adminListPage.submitOption("GCP Service Account Project", oldValue);
        adminListPage.assertNoError("GCP Service Account Project", 5);
    }
}
