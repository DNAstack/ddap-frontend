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

import static com.dnastack.ddap.common.page.NavBar.damServiceDefinitionLink;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

@SuppressWarnings("Duplicates")
public class AdminServiceTemplatesE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminServiceTemplatesE2eTest.class.getSimpleName());

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
    public void addServiceTemplate() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Beacon Discovery Search CUSTOM")));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), "discovery_test");
        adminManagePage.clearField(DdapBy.se("item-editor"));
        adminManagePage.fillField(DdapBy.se("item-editor"), loadTemplate("/com/dnastack/ddap/service-definitions/discoveryCustom.json"));

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("Beacon Discovery Search CUSTOM"));
    }
    
}
