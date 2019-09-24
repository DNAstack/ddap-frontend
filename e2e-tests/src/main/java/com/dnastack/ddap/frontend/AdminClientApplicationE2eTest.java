package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import org.junit.Test;

import static com.dnastack.ddap.common.fragments.NavBar.damClientLink;

@SuppressWarnings("Duplicates")
public class AdminClientApplicationE2eTest extends AbstractAdminFrontendE2eTest {

    @Test
    public void addClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClientLink(DAM_ID));

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("inp-id"), "test-client-app");
        adminManagePage.fillField(DdapBy.se("inp-label"), "test-client-app-name");
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("test-client-app-name");
    }

    @Test
    public void editClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClientLink(DAM_ID));

        adminListPage.assertListItemExists("DNAstack Front-End");
        adminListPage.assertListItemDoNotExist("dnstck Front-End Edited");

        AdminManagePage adminManagePage = adminListPage.clickView("DNAstack Front-End", "Edit");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "dnstck Front-End Edited");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemDoNotExist("DNAstack Front-End");
        adminListPage.assertListItemExists("dnstck Front-End Edited");
    }

    @Test
    public void deleteClientApplication() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damClientLink(DAM_ID));

        adminListPage.assertListItemExists("Test Client");

        AdminManagePage adminManagePage = adminListPage.clickView("Test Client", "Edit");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist("Test Client");
    }
}
