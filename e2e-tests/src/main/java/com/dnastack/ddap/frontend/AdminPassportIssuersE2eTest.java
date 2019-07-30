package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static com.dnastack.ddap.common.page.NavBar.damPassportsLink;

@SuppressWarnings("Duplicates")
public class AdminPassportIssuersE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminPassportIssuersE2eTest.class.getSimpleName());

    @Override
    protected String getRealm() {
        return REALM;
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/passportIssuersConfig.json");
        setupRealmConfig("administrator", testConfig, "1", REALM);
    }

    @Override
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void addMinimalPassportIssuer() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damPassportsLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "empty-passport-id");
        adminManagePage.fillField(DdapBy.se("inp-label"), "empty-passport-issuer");
        adminManagePage.fillField(DdapBy.se("inp-description"), "empty-passport-issuer-desc");

        adminManagePage.fillField(DdapBy.se("inp-issuer"), "https://login.elixir-czech.org/oidc");
        adminManagePage.closeAutocompletes();

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("empty-passport-issuer");
    }

    @Test
    public void addPassportIssuer() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damPassportsLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "full-passport-id");
        adminManagePage.fillField(DdapBy.se("inp-label"), "full-passport-issuer");
        adminManagePage.fillField(DdapBy.se("inp-description"), "full-passport-issuer-desc");

        adminManagePage.fillField(DdapBy.se("inp-issuer"), "https://dbgap.nlm.nih.gov/aa");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-translateUsing"), "dbGaP Passport Translator");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("full-passport-issuer");
    }

    @Test
    public void editPassportIssuer() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damPassportsLink(DAM_ID));

        adminListPage.assertListItemExists("edit-me");
        adminListPage.assertListItemDoNotExist("full-passport-issu3r");

        AdminManagePage adminManagePage = adminListPage.clickView("edit-me", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "full-passport-issu3r");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemDoNotExist("edit-me");
        adminListPage.assertListItemExists("full-passport-issu3r");
    }

    @Test
    public void deletePassportIssuer() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damPassportsLink(DAM_ID));

        adminListPage.assertListItemExists("delete-me");

        AdminManagePage adminManagePage = adminListPage.clickView("delete-me", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist("delete-me");
    }

    @Test
    public void forceDeletePassportIssuer() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damPassportsLink(DAM_ID));

        adminListPage.assertListItemExists("nih");

        AdminManagePage adminManagePage = adminListPage.clickView("nih", "Edit");

        adminManagePage.clickButton(DdapBy.se("btn-delete"));
        ConfirmationRemovalDialog dialog = new ConfirmationRemovalDialog(driver);
        adminListPage = dialog.confirmForceDelete();

        adminListPage.assertListItemDoNotExist("nih");
    }
}
