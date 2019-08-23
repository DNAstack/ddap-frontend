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

import static com.dnastack.ddap.common.page.NavBar.damTrustedSourcesLink;

@SuppressWarnings("Duplicates")
public class AdminTrustedSourcesE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminTrustedSourcesE2eTest.class.getSimpleName());

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
    public void addEmptyTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTrustedSourcesLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "empty-source");
        adminManagePage.fillField(DdapBy.se("inp-label"), "empty-source-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "empty-source-desc");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("empty-source-name");
    }

    @Test
    public void addTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTrustedSourcesLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-source");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-source-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "test-source-desc");

        adminManagePage.enterButton(DdapBy.se("btn-add-source"));
        adminManagePage.toggleExpansionPanel("source-0");
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://test-source.com");

        adminManagePage.enterButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claim"), "^nih.*$");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("test-source-name");
    }

    @Test
    public void editTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTrustedSourcesLink(DAM_ID));

        adminListPage.assertListItemExists("test-source-name");
        adminListPage.assertListItemDoNotExist("t3st-source-nam3");

        AdminManagePage adminManagePage = adminListPage.clickView("test-source", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "t3st-source-nam3");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemDoNotExist("test-source-name");
        adminListPage.assertListItemExists("t3st-source-nam3");
    }

    @Test
    public void deleteTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTrustedSourcesLink(DAM_ID));

        adminListPage.assertListItemExists("delete_me");

        AdminManagePage adminManagePage = adminListPage.clickView("delete_me", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist("delete_me");
    }
}
