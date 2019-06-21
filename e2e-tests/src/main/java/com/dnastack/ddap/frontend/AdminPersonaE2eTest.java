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
import org.openqa.selenium.By;

import java.io.IOException;

import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

@SuppressWarnings("Duplicates")
public class AdminPersonaE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminPersonaE2eTest.class.getSimpleName());

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
    public void addPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-persona");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-persona-name");
        adminManagePage.fillField(DdapBy.se("inp-iss"), "test-issuer");
        adminManagePage.fillField(DdapBy.se("inp-sub"), "test-subject");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ControlledAccessGrants");
        adminManagePage.fillField(DdapBy.se("inp-source"), "test-source");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-value"));
        adminManagePage.fillField(DdapBy.se("inp-iat"), "1d");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "30d");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "peer");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("test-persona-name"));
    }

    @Test
    public void editPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        assertThat(adminListPage.getEntityTitles(), hasItem("John Persona"));
        assertThat(adminListPage.getEntityTitles(), not(hasItem("John Edited")));

        AdminManagePage adminManagePage = adminListPage.clickView("John Persona", "Edit Persona");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "John Edited");
        adminManagePage.clearField(DdapBy.se("inp-iss"));
        adminManagePage.fillField(DdapBy.se("inp-iss"), "test-issuer");
        adminManagePage.clearField(DdapBy.se("inp-sub"));
        adminManagePage.fillField(DdapBy.se("inp-sub"), "test-subject");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "test-claimName");
        adminManagePage.fillField(DdapBy.se("inp-source"), "test-source");
        adminManagePage.fillField(DdapBy.se("inp-value"), "test-value");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "1d");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "30d");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "so");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("John Persona")));
        assertThat(adminListPage.getEntityTitles(), hasItem("John Edited"));
    }

    @Test
    public void deletePersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        assertThat(adminListPage.getEntityTitles(), hasItem("Undergrad Candice"));

        AdminManagePage adminManagePage = adminListPage.clickView("Undergrad Candice", "Edit Persona");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Undergrad Candice")));
    }

    @Test
    public void deleteAndAddPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        assertThat(adminListPage.getEntityTitles(), hasItem("Dr. Joe (eRA Commons)"));
        AdminManagePage adminManagePage = adminListPage.clickView("Dr. Joe (eRA Commons)", "Edit Persona");
        adminListPage = adminManagePage.deleteEntity();
        assertThat(adminListPage.getEntityTitles(), not(hasItem("Dr. Joe (eRA Commons)")));

        adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "dr_joe_era_commons");
        adminManagePage.fillField(DdapBy.se("inp-label"), "Dr. Joe (eRA Commons)");

        adminManagePage.fillField(DdapBy.se("inp-iss"), "https://login.nih.gov/oidc");
        adminManagePage.fillField(DdapBy.se("inp-sub"), "dr_joe@era.nih.gov");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "AffiliationAndRole");
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://uni-heidelberg.de");
        adminManagePage.fillField(DdapBy.se("inp-value"), "faculty@uni-heidelberg.de");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "1d");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "30d");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "so");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ControlledAccessGrants");
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://dbgap.nlm.nih.gov/aa");
        adminManagePage.fillField(DdapBy.se("inp-value"), "https://dac.nih.gov/datasets/phs000710");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "1d");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "30d");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "dac");

        adminManagePage.clickCheckbox(By.id("dataset_example/bq_read/viewer"));
        adminManagePage.clickCheckbox(By.id("dataset_example/gcs_read/viewer"));
        adminManagePage.clickCheckbox(By.id("thousand-genomes/gcs-file-access/viewer"));

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("Dr. Joe (eRA Commons)"));
    }

    @Test
    public void verifyFormErrorsWithInvalidIdentifier() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "123 invalid name");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-persona-name");
        adminManagePage.fillField(DdapBy.se("inp-iss"), "test-issuer");
        adminManagePage.fillField(DdapBy.se("inp-sub"), "test-subject");

        assertTrue(adminManagePage.hasErrors());
    }

    @Test
    public void verifyAutocompleteClaimValuesChangeOnClaimNameChange() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");

        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ControlledAccessGrants");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-value"), "https://dac.nih.gov/datasets/phs000710");
        adminManagePage.closeAutocompletes();

        adminManagePage.clearField(DdapBy.se("inp-claimName"));
        adminManagePage.clearField(DdapBy.se("inp-value"));

        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ResearcherStatus");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-value"), "https://www.nature.com/articles/s41431-018-0219-y");
        adminManagePage.closeAutocompletes();
    }
}
