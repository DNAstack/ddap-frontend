package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.util.DdapBy;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import org.junit.Test;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.dnastack.ddap.common.fragments.NavBar.damServiceDefinitionLink;

@SuppressWarnings("Duplicates")
public class AdminServiceTemplatesE2eTest extends AbstractAdminFrontendE2eTest {

    @Test
    public void addServiceTemplate(){
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));
        String serviceTemplateLabel = "Beacon Discovery Search CUSTOM-3";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), "discovery_test_3");
        adminManagePage.fillField(DdapBy.se("inp-label"), serviceTemplateLabel);
        adminManagePage.fillField(DdapBy.se("inp-description"), "Copy of Beacon Discovery");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-target-adapter"),
                "token:jwt:gatekeeper");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-item-format"), "url");

        // Add interface
        adminManagePage.enterButton(DdapBy.se("btn-add-interface"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-interface-type"), "http:beacon");
        adminManagePage.fillField(DdapBy.se("inp-interface-value"), "${url}");

        // Add role
        adminManagePage.enterButton(DdapBy.se("btn-add-role"));
        adminManagePage.toggleExpansionPanel("role-0");
        adminManagePage.fillField(DdapBy.se("inp-role-name-0"), "basic_discovery");
        adminManagePage.fillField(DdapBy.se("inp-role-label-0"),
                "Discovery Beacon Search without Metadata");
        adminManagePage.fillField(DdapBy.se("inp-role-description-0"),
                "Query genome data and return 'found' or 'not found' status");
        adminManagePage.fillTagField(DdapBy.se("inp-target-scope-0"), "registered");
        adminManagePage.fillTagField(DdapBy.se("inp-dam-role-category-0"), "exists");

        // Add role
        adminManagePage.enterButton(DdapBy.se("btn-add-role"));
        adminManagePage.toggleExpansionPanel("role-0");
        adminManagePage.fillField(DdapBy.se("inp-role-name-0"), "discovery");
        adminManagePage.fillField(DdapBy.se("inp-role-label-0"),
                "Discovery Beacon Search with Metadata");
        adminManagePage.fillField(DdapBy.se("inp-role-description-0"),
                "Query genome data and receive metadata results");
        adminManagePage.fillTagField(DdapBy.se("inp-target-scope-0"), "registered");
        adminManagePage.fillTagField(DdapBy.se("inp-target-scope-0"), "controlled");
        adminManagePage.fillTagField(DdapBy.se("inp-dam-role-category-0"), "metadata");

        adminListPage = adminManagePage.saveEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);
    }

    @Test
    public void editServiceTemplate() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));
        String serviceTemplateLabel = "Beacon Discovery Search CUSTOM-4";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), "discovery_test_4");
        adminManagePage.fillField(DdapBy.se("inp-label"), serviceTemplateLabel);
        adminManagePage.fillField(DdapBy.se("inp-description"), "Copy of Beacon Discovery");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-target-adapter"), "token:jwt:gatekeeper");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-item-format"), "url");

        adminManagePage.enterButton(DdapBy.se("btn-add-interface"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-interface-type"), "http:beacon");
        adminManagePage.fillField(DdapBy.se("inp-interface-value"), "${url}");

        adminListPage = adminManagePage.saveEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);

        AdminManagePage adminManagePage1 = adminListPage.clickView(serviceTemplateLabel, "Edit");
        adminManagePage1.enterButton(DdapBy.se("btn-add-interface"));
        adminManagePage1.toggleExpansionPanel("view-new");
        adminManagePage1.fillField(DdapBy.se("inp-interface-type"), "http:beacon:info");
        adminManagePage1.fillField(DdapBy.se("inp-interface-value"), "${url}/info");

        adminListPage = adminManagePage1.updateEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);
    }

    @Test
    public void deleteServiceTemplate() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));
        String serviceTemplateLabel = "Beacon Discovery Search CUSTOM-5";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);

        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), "discovery_test_5");
        adminManagePage.fillField(DdapBy.se("inp-label"), serviceTemplateLabel);
        adminManagePage.fillField(DdapBy.se("inp-description"), "Copy of Beacon Discovery");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-target-adapter"),
                "token:jwt:gatekeeper");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-item-format"), "url");

        adminListPage = adminManagePage.saveEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);

        AdminManagePage adminManagePage1 = adminListPage.clickView(serviceTemplateLabel, "Edit");
        adminManagePage1.deleteEntity();
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
    }

}
