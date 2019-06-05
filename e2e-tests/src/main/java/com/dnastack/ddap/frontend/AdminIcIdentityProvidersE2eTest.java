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
public class AdminIcIdentityProvidersE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminIcIdentityProvidersE2eTest.class.getSimpleName());

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
    public void addEmptyIdentityProvider() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_IDENTITY_PROVIDERS);

        assertThat(adminListPage.getEntityTitles(), not(hasItem("empty-ip-label")));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "empty-ip-id");
        adminManagePage.fillField(DdapBy.se("inp-label"), "empty-ip-label");
        adminManagePage.fillField(DdapBy.se("inp-description"), "empty-ip-desc");

        adminManagePage.fillField(DdapBy.se("inp-clientId"), "cd26716c-b170-41f7-912e-0f72749c3e9a");
        adminManagePage.fillField(DdapBy.se("inp-issuer"), "https://foo.bar.example.com/oidc");
        adminManagePage.fillField(DdapBy.se("inp-tokenUrl"), "https://foo.bar.example.com/oidc/token");
        adminManagePage.fillField(DdapBy.se("inp-authorizeUrl"), "https://foo.bar.example.com/oidc/authorize");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("empty-ip-label"));
    }

    @Test
    public void addIdentityProvider() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_IDENTITY_PROVIDERS);

        assertThat(adminListPage.getEntityTitles(), not(hasItem("add-ip-label")));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "add-ip-id");
        adminManagePage.fillField(DdapBy.se("inp-label"), "add-ip-label");
        adminManagePage.fillField(DdapBy.se("inp-description"), "add-ip-desc");

        adminManagePage.fillField(DdapBy.se("inp-clientId"), "cd26716c-b170-41f7-912e-0f72749c3e9a");
        adminManagePage.fillField(DdapBy.se("inp-issuer"), "https://foo.bar.example.com/oidc");
        adminManagePage.fillField(DdapBy.se("inp-tokenUrl"), "https://foo.bar.example.com/oidc/token");
        adminManagePage.fillField(DdapBy.se("inp-authorizeUrl"), "https://foo.bar.example.com/oidc/authorize");
        adminManagePage.fillField(DdapBy.se("inp-responseType"), "id_token access_token refresh_token");
        // Temporarily remove as allowable values vary between staging and prod
//        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-translateUsing"), "dbGaP Passport Translator");

        adminManagePage.enterButton(DdapBy.se("btn-add-scope"));
        adminManagePage.fillField(DdapBy.se("inp-scope"), "profile");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("add-ip-label"));
    }

    @Test
    public void editIdentityProvider() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_IDENTITY_PROVIDERS);

        assertThat(adminListPage.getEntityTitles(), hasItem("edit-ip-id"));
        assertThat(adminListPage.getEntityTitles(), not(hasItem("edited-ip-id")));

        AdminManagePage adminManagePage = adminListPage.clickView("edit-ip-id", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "edited-ip-id");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("edit-ip-id")));
        assertThat(adminListPage.getEntityTitles(), hasItem("edited-ip-id"));
    }

    @Test
    public void deleteIdentityProvider() {
        ddapPage.getNavBar()
                .goTo(NavItem.IC_PANEL);
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.IC_IDENTITY_PROVIDERS);

        assertThat(adminListPage.getEntityTitles(), hasItem("delete-ip-id"));

        AdminManagePage adminManagePage = adminListPage.clickView("delete-ip-id", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("delete-ip-id")));
    }
}
