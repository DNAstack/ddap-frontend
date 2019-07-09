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

import static com.dnastack.ddap.common.page.NavBar.damClaimDefinitionLink;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

@SuppressWarnings("Duplicates")
public class AdminClaimDefinitionsE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminClaimDefinitionsE2eTest.class.getSimpleName());

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
    public void addClaimDefinitionWithMinimalFields() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClaimDefinitionLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        String claimDefId = "test-claim-def-minimal";
        adminManagePage.fillField(DdapBy.se("inp-id"), claimDefId);
        adminManagePage.fillField(DdapBy.se("inp-label"), claimDefId);

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(claimDefId));
    }

    @Test
    public void addClaimDefinitionWithAllFields() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClaimDefinitionLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        String claimDefId = "test-claim-def-full";
        adminManagePage.fillField(DdapBy.se("inp-id"), claimDefId);
        adminManagePage.fillField(DdapBy.se("inp-label"), claimDefId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-infoUrl"), "http://this-is-info-url.com");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(claimDefId));
    }

    @Test
    public void editClaimDefinition() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClaimDefinitionLink(DAM_ID));

        assertThat(adminListPage.getEntityTitles(), hasItem("Accepted Terms and Policies"));
        assertThat(adminListPage.getEntityTitles(), not(hasItem("Accepted Terms and Policies Edited")));

        AdminManagePage adminManagePage = adminListPage.clickView("Accepted Terms and Policies", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "Accepted Terms and Policies Edited");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Accepted Terms and Policies")));
        assertThat(adminListPage.getEntityTitles(), hasItem("Accepted Terms and Policies Edited"));
    }

    @Test
    public void deleteClaimDefinition() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClaimDefinitionLink(DAM_ID));

        assertThat(adminListPage.getEntityTitles(), hasItem("Affiliation and Role"));

        AdminManagePage adminManagePage = adminListPage.clickView("Affiliation and Role", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Affiliation and Role")));
    }
}
