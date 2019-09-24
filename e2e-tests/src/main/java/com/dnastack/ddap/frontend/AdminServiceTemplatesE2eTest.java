package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import org.junit.Test;

import static com.dnastack.ddap.common.fragments.NavBar.damServiceDefinitionLink;

@SuppressWarnings("Duplicates")
public class AdminServiceTemplatesE2eTest extends AbstractAdminFrontendE2eTest {

    @Test
    public void addServiceTemplate() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));

        adminListPage.assertListItemDoNotExist("Beacon Discovery Search CUSTOM");

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), "discovery_test");
        adminManagePage.clearField(DdapBy.se("item-editor"));
        adminManagePage.fillField(DdapBy.se("item-editor"), loadTemplate("/com/dnastack/ddap/service-definitions/discoveryCustom.json"));

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists("Beacon Discovery Search CUSTOM");

    }
    
}
