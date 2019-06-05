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
public class AdminTrustedSourcesE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminTrustedSourcesE2eTest.class.getSimpleName());

    @Override
    protected String getRealm() {
        return REALM;
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/trustedSourcesConfig.json");
        setupRealmConfig("administrator", testConfig, REALM);
    }

    @Override
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    @Test
    public void addEmptyTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.TRUSTED_SOURCES);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "empty-source");
        adminManagePage.fillField(DdapBy.se("inp-label"), "empty-source-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "empty-source-desc");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("empty-source-name"));
    }

    @Test
    public void addTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.TRUSTED_SOURCES);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-source");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-source-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "test-source-desc");

        adminManagePage.enterButton(DdapBy.se("btn-add-source"));
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://test-source.com");

        adminManagePage.enterButton(DdapBy.se("btn-add-claim"));
        adminManagePage.fillField(DdapBy.se("inp-claim"), "^nih.*$");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("test-source-name"));
    }

    @Test
    public void editTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.TRUSTED_SOURCES);

        assertThat(adminListPage.getEntityTitles(), hasItem("test-source-name"));
        assertThat(adminListPage.getEntityTitles(), not(hasItem("test-source-nam3")));

        AdminManagePage adminManagePage = adminListPage.clickView("test-source", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-source-nam3");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("test-source-name")));
        assertThat(adminListPage.getEntityTitles(), hasItem("test-source-nam3"));
    }

    @Test
    public void deleteTrustedSource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.TRUSTED_SOURCES);

        assertThat(adminListPage.getEntityTitles(), hasItem("delete_me"));

        AdminManagePage adminManagePage = adminListPage.clickView("delete_me", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("delete_me")));
    }
}
