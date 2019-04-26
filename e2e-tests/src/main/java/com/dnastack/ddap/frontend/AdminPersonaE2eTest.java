package com.dnastack.ddap.frontend;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import java.io.IOException;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;

@SuppressWarnings("Duplicates")
public class AdminPersonaE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/navbarE2eTestConfig.json");
        setupRealmConfig("administrator", testConfig, REALM);
    }

    @Override
    protected HasNavBar login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AnyDdapPage::new);
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
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "test-claimName");
        adminManagePage.fillField(DdapBy.se("inp-source"), "test-source");
        adminManagePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-value"));
        adminManagePage.fillField(DdapBy.se("inp-iat"), "2/14/2019 6:00 AM");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "2/14/2039 6:00 AM");
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

        AdminManagePage adminManagePage = adminListPage.clickView("John Persona", "View Persona");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "John Edited");
        adminManagePage.clearField(DdapBy.se("inp-iss"));
        adminManagePage.fillField(DdapBy.se("inp-iss"), "test-issuer");
        adminManagePage.clearField(DdapBy.se("inp-sub"));
        adminManagePage.fillField(DdapBy.se("inp-sub"), "test-subject");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "test-claimName");
        adminManagePage.fillField(DdapBy.se("inp-source"), "test-source");
        adminManagePage.fillField(DdapBy.se("inp-value"), "test-value");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "2/14/2019 6:00 AM");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "2/14/2039 6:00 AM");
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

        AdminManagePage adminManagePage = adminListPage.clickView("Undergrad Candice", "View Persona");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Undergrad Candice")));
    }

    @Test
    public void deleteAndAddPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        assertThat(adminListPage.getEntityTitles(), hasItem("Dr. Joe (eRA Commons)"));

        AdminManagePage adminManagePage = adminListPage.clickView("Dr. Joe (eRA Commons)", "View Persona");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem("Dr. Joe (eRA Commons)")));

        adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "dr_joe_era_commons");
        adminManagePage.fillField(DdapBy.se("inp-label"), "Dr. Joe (eRA Commons)");
        adminManagePage.fillField(DdapBy.se("inp-iss"), "https://login.nih.org/oidc/");
        adminManagePage.fillField(DdapBy.se("inp-sub"), "dr_joe@era.nih.gov");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ga4gh.ControlledAccessGrants");
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://dbgap.nlm.nih.gov/aa");
        adminManagePage.fillField(DdapBy.se("inp-value"), "https://dac.nih.gov/datasets/phys000710");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "2/14/2019 6:00 AM");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "2/14/2039 6:00 AM");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "dac");

        adminManagePage.clickCheckbox(By.id("thousand-genomes/full-read-access/viewer"));

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem("Dr. Joe (eRA Commons)"));
    }
}
