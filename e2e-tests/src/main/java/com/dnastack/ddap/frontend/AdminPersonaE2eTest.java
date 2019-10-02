package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import com.dnastack.ddap.common.util.DdapBy;
import org.junit.Test;

import static com.dnastack.ddap.common.fragments.NavBar.damTestPersonaLink;
import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.Matchers.containsString;

@SuppressWarnings("Duplicates")
public class AdminPersonaE2eTest extends AbstractAdminFrontendE2eTest {

    @Test
    public void addPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTestPersonaLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-persona");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-persona-name");
        adminManagePage.fillField(DdapBy.se("inp-iss"), "test-issuer");
        adminManagePage.fillField(DdapBy.se("inp-sub"), "test-subject");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ControlledAccessGrants");
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://institute1.test");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-value"));
        adminManagePage.fillField(DdapBy.se("inp-iat"), "1d");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "30d");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "peer");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("test-persona-name");
    }

    @Test
    public void editPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTestPersonaLink(DAM_ID));

        adminListPage.assertListItemExists("John Persona");
        adminListPage.assertListItemDoNotExist("Cooler John");

        AdminManagePage adminManagePage = adminListPage.clickView("John Persona", "Edit Persona");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "Cooler John");
        adminManagePage.clearField(DdapBy.se("inp-iss"));
        adminManagePage.fillField(DdapBy.se("inp-iss"), "test-issuer");
        adminManagePage.clearField(DdapBy.se("inp-sub"));
        adminManagePage.fillField(DdapBy.se("inp-sub"), "test-subject");

        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");
        adminManagePage.fillField(DdapBy.se("inp-claimName"), "test-claimName");
        adminManagePage.fillField(DdapBy.se("inp-source"), "https://institute1.test");
        adminManagePage.fillField(DdapBy.se("inp-value"), "test-value");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "1d");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "30d");
        adminManagePage.closeAutocompletes();
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-by"), "so");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemDoNotExist("John Persona");
        adminListPage.assertListItemExists("Cooler John");
    }

    @Test
    public void deletePersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTestPersonaLink(DAM_ID));

        adminListPage.assertListItemExists("Undergrad Candice");

        AdminManagePage adminManagePage = adminListPage.clickView("Undergrad Candice", "Edit Persona");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist("Undergrad Candice");
    }

    @Test
    public void verifyFormErrorsWithInvalidIdentifier() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damTestPersonaLink(DAM_ID));

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
                .goToAdmin(damTestPersonaLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.clickButton(DdapBy.se("btn-add-claim"));
        adminManagePage.toggleExpansionPanel("claim-0");

        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ControlledAccessGrants");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-value"), "https://dnastack.com/used/value");
        adminManagePage.closeAutocompletes();

        adminManagePage.clearField(DdapBy.se("inp-claimName"));
        adminManagePage.clearField(DdapBy.se("inp-value"));

        adminManagePage.fillField(DdapBy.se("inp-claimName"), "ResearcherStatus");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-value"), "https://www.nature.com/articles/s99999-999-9999-z");
        adminManagePage.closeAutocompletes();
    }

    @Test
    public void editInvalidPersonaAccessShowsValidationMessage() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damTestPersonaLink(DAM_ID));

        adminListPage.assertListItemExists("Dr. Joe (Elixir)");

        AdminManagePage adminManagePage = adminListPage.clickView("Dr. Joe (Elixir)", "Edit Persona");

        adminManagePage.clearField(DdapBy.se("inp-label"));

        adminManagePage.clickUpdate();
        adminManagePage.assertError(containsString("Please fix invalid fields"));
    }

}
