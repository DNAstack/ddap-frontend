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
public class AdminIcClientsE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminIcClientsE2eTest.class.getSimpleName());

    @Override
    protected String getRealm() {
        return REALM;
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/icConfig.json");
        setupIcConfig("administrator", testConfig, REALM);
    }

    @Override
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void addEmptyClient() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_CLIENTS);

        assertThat(adminListPage.getEntityTitles(), not(hasItem("empty-client-label")));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "empty-client-id");
        adminManagePage.fillField(DdapBy.se("inp-clientId"), "cd26716c-b170-41f7-912e-0f72749c3e9a");
        adminManagePage.fillField(DdapBy.se("inp-label"), "empty-client-label");
        adminManagePage.fillField(DdapBy.se("inp-description"), "empty-client-desc");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("empty-client-label"));
    }

    @Test
    public void addClient() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_CLIENTS);

        assertThat(adminListPage.getEntityTitles(), not(hasItem("add-client-label")));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "add-client-id");
        adminManagePage.fillField(DdapBy.se("inp-clientId"), "cd26716c-b170-41f7-912e-0f72749c3e9a");
        adminManagePage.fillField(DdapBy.se("inp-label"), "add-client-label");
        adminManagePage.fillField(DdapBy.se("inp-description"), "add-client-desc");

        adminManagePage.enterButton(DdapBy.se("btn-add-redirect"));
        adminManagePage.fillField(DdapBy.se("inp-redirect"), "https://test-source.com");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("add-client-label"));
    }

    @Test
    public void editClient() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_CLIENTS);

        assertThat(adminListPage.getEntityTitles(), hasItem("edit-client-id"));
        assertThat(adminListPage.getEntityTitles(), not(hasItem("edited-client-id")));

        AdminManagePage adminManagePage = adminListPage.clickView("edit-client-id", "View");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "edited-client-id");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("edit-client-id")));
        assertThat(adminListPage.getEntityTitles(), hasItem("edited-client-id"));
    }

    @Test
    public void deleteClient() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_CLIENTS);

        assertThat(adminListPage.getEntityTitles(), hasItem("delete-client-id"));

        AdminManagePage adminManagePage = adminListPage.clickView("delete-client-id", "View");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("delete-client-id")));
    }
}
