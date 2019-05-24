package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

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
        setupRealmConfig("administrator", testConfig, REALM);
    }

    @Override
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void addClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.CLIENTS);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-client-app");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-client-app-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("test-client-app-name"));
    }

    @Test
    public void editClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.CLIENTS);

        assertThat(adminListPage.getEntityTitles(), hasItem("DNAstack Front-End"));
        assertThat(adminListPage.getEntityTitles(), not(hasItem("DNAstack Front-End Edited")));

        AdminManagePage adminManagePage = adminListPage.clickView("DNAstack Front-End", "View");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "DNAstack Front-End Edited");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("DNAstack Front-End")));
        assertThat(adminListPage.getEntityTitles(), hasItem("DNAstack Front-End Edited"));
    }

    @Test
    public void deleteClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.CLIENTS);

        assertThat(adminListPage.getEntityTitles(), hasItem("Test Client"));

        AdminManagePage adminManagePage = adminListPage.clickView("Test Client", "View");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Test Client")));
    }
}
