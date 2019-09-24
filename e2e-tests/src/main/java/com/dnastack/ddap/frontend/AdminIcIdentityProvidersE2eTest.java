package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import com.dnastack.ddap.common.page.ICLoginPage;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static com.dnastack.ddap.common.fragments.NavBar.icIdentityProvidersLink;

@SuppressWarnings("Duplicates")
public class AdminIcIdentityProvidersE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(AdminIcIdentityProvidersE2eTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String icConfig = loadTemplate("/com/dnastack/ddap/icAdminConfig.json");
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig("administrator", damConfig, "1", REALM);
        setupIcConfig("administrator", icConfig, REALM);

        ICLoginPage icLoginPage = startLogin(REALM);
        ddapPage = icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void addEmptyIdentityProvider() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(icIdentityProvidersLink());

        adminListPage.assertListItemDoNotExist("empty-ip-label");

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "empty-ip-id");
        adminManagePage.fillField(DdapBy.se("inp-label"), "empty-ip-label");
        adminManagePage.fillField(DdapBy.se("inp-description"), "empty-ip-desc");

        adminManagePage.fillField(DdapBy.se("inp-clientId"), "cd26716c-b170-41f7-912e-0f72749c3e9a");
        adminManagePage.fillField(DdapBy.se("inp-issuer"), "https://foo.bar.example.com/oidc");
        adminManagePage.fillField(DdapBy.se("inp-tokenUrl"), "https://foo.bar.example.com/oidc/token");
        adminManagePage.fillField(DdapBy.se("inp-authorizeUrl"), "https://foo.bar.example.com/oidc/authorize");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("empty-ip-label");
    }

    @Test
    public void addIdentityProvider() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(icIdentityProvidersLink());

        adminListPage.assertListItemDoNotExist("add-ip-label");

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
        adminManagePage.toggleExpansionPanel("scope-0");
        adminManagePage.fillField(DdapBy.se("inp-scope"), "profile");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("add-ip-label");
    }

    @Test
    public void editIdentityProvider() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(icIdentityProvidersLink());

        adminListPage.assertListItemExists("edit-ip-id");
        adminListPage.assertListItemDoNotExist("edited-ip-id");

        AdminManagePage adminManagePage = adminListPage.clickView("edit-ip-id", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "edited-ip-id");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemDoNotExist("edit-ip-id");
        adminListPage.assertListItemExists("edited-ip-id");
    }

    @Test
    public void deleteIdentityProvider() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(icIdentityProvidersLink());

        adminListPage.assertListItemExists("delete-ip-id");

        AdminManagePage adminManagePage = adminListPage.clickView("delete-ip-id", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist("delete-ip-id");
    }
}
