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
    public void addServiceTemplate() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));
        String serviceTemplateLabel = "Beacon Discovery Search CUSTOM-1";
        String serviceTemplateName = "discovery_test_1";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
        AdminManagePage adminManagePage = createSimpleServiceTemplate(adminListPage,
                serviceTemplateLabel,
                serviceTemplateName);

        adminListPage = adminManagePage.saveEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);
    }

    @Test
    public void addServiceTemplateWithInterface() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));
        String serviceTemplateLabel = "Beacon Discovery Search CUSTOM-2";
        String serviceTemplateName = "discovery_test_2";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
        AdminManagePage adminManagePage = createSimpleServiceTemplate(adminListPage,
                serviceTemplateLabel,
                serviceTemplateName);

        adminManagePage.enterButton(DdapBy.se("btn-add-interface"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-interface-type"), "http:beacon");
        adminManagePage.fillField(DdapBy.se("inp-interface-value"), "${url}");

        adminListPage = adminManagePage.saveEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);
    }

    @Test
    public void addServiceTemplateWithRoles(){
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(damServiceDefinitionLink(DAM_ID));
        String serviceTemplateLabel = "Beacon Discovery Search CUSTOM-3";
        String serviceTemplateName = "discovery_test_3";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
        AdminManagePage adminManagePage = createSimpleServiceTemplate(adminListPage,
                serviceTemplateLabel,
                serviceTemplateName);

        fillRoleDetails(adminManagePage,
                "basic_discovery",
                "Discovery Beacon Search without Metadata",
                "Query genome data and return 'found' or 'not found' status");
        adminManagePage.fillTagField(DdapBy.se("inp-target-scope-0"), "registered");
        adminManagePage.fillTagField(DdapBy.se("inp-dam-role-category-0"), "exists");


        fillRoleDetails(adminManagePage,
                "discovery",
                "Discovery Beacon Search with Metadata",
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
        String serviceTemplateName = "discovery_test_4";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
        AdminManagePage adminManagePage = createSimpleServiceTemplate(adminListPage,
                serviceTemplateLabel,
                serviceTemplateName);

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
        String serviceTemplateName = "discovery_test_5";
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
        AdminManagePage adminManagePage = createSimpleServiceTemplate(adminListPage,
                serviceTemplateLabel,
                serviceTemplateName);

        adminListPage = adminManagePage.saveEntity();
        adminListPage.assertListItemExists(serviceTemplateLabel);

        AdminManagePage adminManagePage1 = adminListPage.clickView(serviceTemplateLabel, "Edit");
        adminManagePage1.deleteEntity();
        adminListPage.assertListItemDoNotExist(serviceTemplateLabel);
    }


    private AdminManagePage createSimpleServiceTemplate(AdminListPage adminListPage,
                                                        String serviceTemplateLabel,
                                                        String serviceTemplateName) {
        AdminManagePage adminManagePage = adminListPage.clickManage();

        adminManagePage.fillField(DdapBy.se("id-field"), serviceTemplateName);
        adminManagePage.fillField(DdapBy.se("inp-label"), serviceTemplateLabel);
        adminManagePage.fillField(DdapBy.se("inp-description"), "Copy of Beacon Discovery");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-target-adapter"), "token:jwt:gatekeeper");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-item-format"), "url");
        return adminManagePage;
    }

    private void fillRoleDetails(AdminManagePage adminManagePage,
                                 String roleName,
                                 String roleLabel,
                                 String roleDescription) {
        adminManagePage.enterButton(DdapBy.se("btn-add-role"));
        adminManagePage.toggleExpansionPanel("role-0");
        adminManagePage.fillField(DdapBy.se("inp-role-name-0"), roleName);
        adminManagePage.fillField(DdapBy.se("inp-role-label-0"), roleLabel);
        adminManagePage.fillField(DdapBy.se("inp-role-description-0"), roleDescription);
    }
    
}
