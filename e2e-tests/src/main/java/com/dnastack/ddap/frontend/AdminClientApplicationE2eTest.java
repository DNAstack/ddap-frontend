package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import com.dnastack.ddap.common.page.ICLoginPage;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static com.dnastack.ddap.common.page.NavBar.damClientLink;

@SuppressWarnings("Duplicates")
public class AdminClientApplicationE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminClientApplicationE2eTest.class.getSimpleName());

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
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void addClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClientLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-client-app");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-client-app-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("test-client-app-name");
    }

    @Test
    public void editClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClientLink(DAM_ID));

        adminListPage.assertListItemExists("DNAstack Front-End");
        adminListPage.assertListItemDoNotExist("dnstck Front-End Edited");

        AdminManagePage adminManagePage = adminListPage.clickView("DNAstack Front-End", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "dnstck Front-End Edited");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemDoNotExist("DNAstack Front-End");
        adminListPage.assertListItemExists("dnstck Front-End Edited");
    }

    @Test
    public void deleteClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClientLink(DAM_ID));

        adminListPage.assertListItemExists("Test Client");

        AdminManagePage adminManagePage = adminListPage.clickView("Test Client", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist("Test Client");
    }
}
