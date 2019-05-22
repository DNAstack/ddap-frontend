package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AdminOptionPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasItem;

@SuppressWarnings("Duplicates")
public class AdminIcOptionsE2eTest extends AbstractFrontendE2eTest {

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
                                                .goToAdminOptionPage(NavItem.IC_OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("Read Only Master Realm"));
        adminListPage.submitOption("Read Only Master Realm", "foobar");
        adminListPage.assertError("Read Only Master Realm", 5, containsString("boolean"));
    }

    @Test
    public void submitBooleanOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.IC_OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("Read Only Master Realm"));
        final String oldValue = adminListPage.getOptionValue("Read Only Master Realm");
        adminListPage.submitOption("Read Only Master Realm", oldValue);
        adminListPage.assertNoError("Read Only Master Realm", 5);
    }

    @Test
    public void submitNumberOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.IC_OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("Account Name Length"));
        final String oldValue = adminListPage.getOptionValue("Account Name Length");
        adminListPage.submitOption("Account Name Length", oldValue);
        adminListPage.assertNoError("Account Name Length", 5);
    }

    @Test
    public void submitStringOptionWithoutTypeError() {
        AdminOptionPage adminListPage = ddapPage.getNavBar()
                                                .goToAdminOptionPage(NavItem.IC_OPTIONS);

        assertThat(adminListPage.getOptionNames(), hasItem("Default Passport Token TTL"));
        final String oldValue = adminListPage.getOptionValue("Default Passport Token TTL");
        adminListPage.submitOption("Default Passport Token TTL", oldValue);
        adminListPage.assertNoError("Default Passport Token TTL", 5);
    }
}
