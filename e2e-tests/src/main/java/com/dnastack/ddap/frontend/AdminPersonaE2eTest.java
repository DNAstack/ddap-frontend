package com.dnastack.ddap.frontend;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import java.io.IOException;
import org.junit.BeforeClass;
import org.junit.Test;

@SuppressWarnings("Duplicates")
public class AdminPersonaE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/navbarE2eTestConfig.json");
        setupRealmConfig("nci_researcher", testConfig, REALM);
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
        adminManagePage.fillField(DdapBy.se("inp-value"), "test-value");
        adminManagePage.fillField(DdapBy.se("inp-iat"), "123");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "123");
        adminManagePage.fillField(DdapBy.se("inp-by"), "test-by");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityList(), hasItem("test-persona-name"));
    }

    @Test
    public void editPersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        assertThat(adminListPage.getEntityList(), hasItem("John Persona"));
        assertThat(adminListPage.getEntityList(), not(hasItem("John Edited")));

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
        adminManagePage.fillField(DdapBy.se("inp-iat"), "123");
        adminManagePage.fillField(DdapBy.se("inp-exp"), "123");
        adminManagePage.fillField(DdapBy.se("inp-by"), "test-by");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityList(), not(hasItem("John Persona")));
        assertThat(adminListPage.getEntityList(), hasItem("John Edited"));
    }

    @Test
    public void deletePersona() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.PERSONAS);

        assertThat(adminListPage.getEntityList(), hasItem("Undergrad Candice"));

        AdminManagePage adminManagePage = adminListPage.clickView("Undergrad Candice", "View Persona");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityList(), not(hasItem("Undergrad Candice")));
    }
}
