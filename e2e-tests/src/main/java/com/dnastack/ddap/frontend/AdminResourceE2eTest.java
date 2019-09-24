package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AdminListPage;
import com.dnastack.ddap.common.page.AdminManagePage;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.dnastack.ddap.common.fragments.NavBar.damResourceLink;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.startsWith;

@SuppressWarnings("Duplicates")
public class AdminResourceE2eTest extends AbstractAdminFrontendE2eTest {

    private void waitForAccessTablesToLoad() {
        new WebDriverWait(driver, 60)
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(By.tagName("mat-table"), 3));
    }

    @Test
    public void addResourceWithNoViews() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceId = "resource-" + System.currentTimeMillis();

        waitForAccessTablesToLoad();
        adminListPage.assertListItemDoNotExist(resourceId);

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");
        adminManagePage.fillField(DdapBy.se("inp-access"), "controlled");
        adminManagePage.fillField(DdapBy.se("inp-year"), "2019");
        adminManagePage.fillField(DdapBy.se("inp-size"), "120 GB");
        adminManagePage.fillField(DdapBy.se("inp-tags"), "test, e2e, resource");
        adminManagePage.fillField(DdapBy.se("inp-image-url"), "http://test-image-url.com");
        adminManagePage.fillField(DdapBy.se("inp-info-url"), "http://test-info-url.com");
        adminManagePage.fillField(DdapBy.se("inp-apply-url"), "http://test-apply-url.com");
        adminManagePage.fillField(DdapBy.se("inp-troubleshoot-url"), "http://test-troubleshoot-url.com");
        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists(resourceId);
    }

    @Test
    public void addResourceAndSingleView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceId = "resource-" + System.currentTimeMillis();
        String viewId = "view-" + System.currentTimeMillis();
        String role = "discovery";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemDoNotExist(resourceId);

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");

        adminManagePage.enterButton(DdapBy.se("btn-add-view"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-view-id"), viewId);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), viewId);
        adminManagePage.fillField(DdapBy.se("inp-view-description"), "View Description");
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Phase 3");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Beacon Discovery Search");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-url"), "http://beacon-test.com");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + role));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + role), "ethics");

        adminManagePage.findCheckedCheckbox(viewId + "/" + role + "/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox(viewId + "/" + role + "/nci_researcher");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists(resourceId);
    }

    @Test
    public void addResourceAndMultipleViews() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceId = "resource-" + System.currentTimeMillis();
        String view1Id = "view1-" + System.currentTimeMillis();
        String view1Role = "viewer";
        String view2Id = "view2-" + System.currentTimeMillis();
        String view2Role = "discovery";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemDoNotExist(resourceId);

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");

        adminManagePage.enterButton(DdapBy.se("btn-add-view"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-view-id"), view1Id);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), view1Id);
        adminManagePage.fillField(DdapBy.se("inp-view-description"), "View 1 Description");
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Phase 3");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Google Cloud Storage");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-bucket"), "ga4gh-apis-controlled-access");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-project"), "ga4gh-apis");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + view1Role));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + view1Role), "nih_dac(DATASETS=https://dac.nih.gov/datasets/phs000710)");

        adminManagePage.clickButton(DdapBy.se("btn-add-view"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-view-id"), view2Id);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), view2Id);
        adminManagePage.fillField(DdapBy.se("inp-view-description"), "View 2 Description");
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Version 2");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Beacon Discovery Search");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-url"), "http://beacon-test.com");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + view2Role));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + view2Role), "ethics");
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + view2Role), "bona_fide");

        adminManagePage.findCheckedCheckbox(view1Id + "/" + view1Role + "/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox(view1Id + "/" + view1Role + "/nci_researcher");
        adminManagePage.findCheckedCheckbox(view2Id + "/" + view2Role + "/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox(view2Id + "/" + view2Role + "/nci_researcher");

        adminListPage = adminManagePage.saveEntity();

        adminListPage.assertListItemExists(resourceId);
    }

    @Test
    public void createInvalidResourceShowsServerSideError() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceId = "resource-" + System.currentTimeMillis();
        String viewId = "view-" + System.currentTimeMillis();
        String role = "discovery";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemDoNotExist(resourceId);

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");

        adminManagePage.enterButton(DdapBy.se("btn-add-view"));
        adminManagePage.toggleExpansionPanel("view-new");
        adminManagePage.fillField(DdapBy.se("inp-view-id"), viewId);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), viewId);
        adminManagePage.fillField(DdapBy.se("inp-view-description"), "View Description");
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Phase 3");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Beacon Discovery Search");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-url"), "http://beacon-test.com");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + role));
        // This is the invalid part
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + role), "NONEXISTENT_POLICY");

        adminManagePage.clickSave();
        adminManagePage.assertError(containsString("NONEXISTENT_POLICY"));
        adminManagePage.assertError(Matchers.not(startsWith("{")));
    }

    @Test
    public void editInvalidResourceShowsServerSideError() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceToEdit = "1000 Genomes";
        String newDefaultRole = "basic_discovery";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemExists(resourceToEdit);

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");
        adminManagePage.toggleExpansionPanel("view-discovery-access");

        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + newDefaultRole));
        // Invalid part
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + newDefaultRole), "NONEXISTENT_POLICY");

        adminManagePage.clickUpdate();
        adminManagePage.assertError(containsString("NONEXISTENT_POLICY"));
        adminManagePage.assertError(Matchers.not(startsWith("{")));
    }

    @Test
    public void editInvalidPersonaAccessShowsValidationMessage() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceToEdit = "1000 Genomes";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemExists(resourceToEdit);

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");
        WebElement drJoeCheckbox = adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");

        drJoeCheckbox.click();
        // If we don't wait, submitting the form will happen before validation can occur.
        new WebDriverWait(driver, 10).until(d -> drJoeCheckbox.getAttribute("class").contains("ng-invalid"));
        adminManagePage.clickUpdate();
        adminManagePage.assertError(containsString("Please fix invalid fields"));
    }

    @Test
    public void editResourceEditViewMakeNewDefaultRole() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceToEdit = "1000 Genomes";
        String newDefaultRole = "basic_discovery";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemExists(resourceToEdit);

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");
        adminManagePage.toggleExpansionPanel("view-discovery-access");

        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/nci_researcher");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/nci_researcher");

        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + newDefaultRole));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + newDefaultRole), "ethics");

        adminManagePage.findCheckedCheckbox("discovery-access/" + newDefaultRole + "/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/" + newDefaultRole + "/nci_researcher");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/nci_researcher");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/nci_researcher");

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemExists(resourceToEdit);
    }

    @Test
    public void editResourceRemoveView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceToEdit = "1000 Genomes";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemExists(resourceToEdit);

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");
        adminManagePage.toggleExpansionPanel("view-gcs-file-access");

        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/nci_researcher");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/nci_researcher");

        adminManagePage.enterButton(DdapBy.se("btn-remove-view-gcs-file-access"));

        // workaround to rebuild matrix, matrix is not rebuilt on view removal/addition
        adminManagePage.clickCheckbox(By.id("discovery-access/discovery/dr_joe_elixir"));
        // Wait until matrix refreshes before submitting
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.waitForInflightRequests();

        adminListPage = adminManagePage.updateEntity();

        adminListPage.assertListItemExists(resourceToEdit);
    }

    @Test
    public void editResourceNoChangesToView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceToEdit = "GA4GH APIs";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemExists(resourceToEdit);

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), "Cool edited resource");

        adminManagePage.findCheckedCheckbox("beacon/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("beacon/discovery/nci_researcher");
        adminManagePage.findCheckedCheckbox("gcs_read/viewer/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox("gcs_read/viewer/nci_researcher");

        adminListPage = adminManagePage.updateEntity();
        waitForAccessTablesToLoad();

        adminListPage.assertListItemDoNotExist(resourceToEdit);
        adminListPage.assertListItemExists("Cool edited resource");
    }

    @Test
    public void deleteResource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                                              .goToAdmin(damResourceLink(DAM_ID));
        String resourceToDelete = "Billing Test for GCS and BigQuery";

        waitForAccessTablesToLoad();
        adminListPage.assertListItemExists(resourceToDelete);

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToDelete, "Edit Resource");

        adminListPage = adminManagePage.deleteEntity();

        adminListPage.assertListItemDoNotExist(resourceToDelete);
    }
}
