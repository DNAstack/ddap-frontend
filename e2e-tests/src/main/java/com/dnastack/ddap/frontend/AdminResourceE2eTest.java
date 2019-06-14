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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

@SuppressWarnings("Duplicates")
public class AdminResourceE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(AdminResourceE2eTest.class.getSimpleName());

    @Override
    protected String getRealm() {
        return REALM;
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/resourcesConfig.json");
        setupRealmConfig("administrator", testConfig, REALM);
    }

    @Override
    protected AdminDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsAdministrator(AdminDdapPage::new);
    }

    private void waitForAccessTablesToLoad() {
        new WebDriverWait(driver, 60)
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(By.tagName("mat-table"), 3));
    }

    @Test
    public void addResourceWithMinimalFieldsAndNoViews() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceId = "resource-" + System.currentTimeMillis();

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), not(hasItem(resourceId)));

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");
        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceId));
    }

    @Test
    public void addResourceWithAllFieldsAndNoViews() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceId = "resource-" + System.currentTimeMillis();

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), not(hasItem(resourceId)));

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

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceId));
    }

    @Test
    public void addResourceAndSingleView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceId = "resource-" + System.currentTimeMillis();
        String viewId = "view-" + System.currentTimeMillis();
        String role = "discovery";

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), not(hasItem(resourceId)));

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");

        adminManagePage.enterButton(DdapBy.se("btn-add-view"));
        adminManagePage.fillField(DdapBy.se("inp-view-id"), viewId);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), viewId);
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Phase 3");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Beacon Discovery Search");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-url"), "http://beacon-test.com");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + role));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + role), "ethics");

        adminManagePage.findCheckedCheckbox(viewId + "/" + role + "/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox(viewId + "/" + role + "/nci_researcher");

        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceId));
    }

    @Test
    public void addResourceAndMultipleViews() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceId = "resource-" + System.currentTimeMillis();
        String view1Id = "view1-" + System.currentTimeMillis();
        String view1Role = "viewer";
        String view2Id = "view2-" + System.currentTimeMillis();
        String view2Role = "discovery";

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), not(hasItem(resourceId)));

        AdminManagePage adminManagePage = adminListPage.clickManage();
        adminManagePage.fillField(DdapBy.se("inp-id"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceId);
        adminManagePage.fillField(DdapBy.se("inp-description"), "This is description");
        adminManagePage.fillField(DdapBy.se("inp-owner"), "E2E test");
        adminManagePage.fillField(DdapBy.se("inp-max-ttl"), "7d");

        adminManagePage.enterButton(DdapBy.se("btn-add-view"));
        adminManagePage.fillField(DdapBy.se("inp-view-id"), view1Id);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), view1Id);
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Phase 3");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Google Cloud Storage");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-bucket"), "ga4gh-apis-controlled-access");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable-project"), "ga4gh-apis");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-" + view1Role));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-" + view1Role), "nih_dac(DATASETS=https://dac.nih.gov/datasets/phs000710)");

        adminManagePage.clickButton(DdapBy.se("btn-add-view"));
        adminManagePage.fillField(DdapBy.se("inp-view-id"), view2Id);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), view2Id);
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

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceId));
    }

    @Test
    public void editResourceEditViewMakeNewDefaultRole() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceToEdit = "1000 Genomes";
        String newDefaultRole = "basic_discovery";

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToEdit));

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");

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

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToEdit));
    }

    @Test
    public void editResourceRemoveView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceToEdit = "1000 Genomes";

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToEdit));

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");

        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/nci_researcher");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/nci_researcher");

        adminManagePage.enterButton(DdapBy.se("btn-remove-view-gcs-file-access"));
        // workaround to rebuild matrix, matrix is not rebuilt on view removal/addition
        adminManagePage.clickCheckbox(By.id("discovery-access/discovery/administrator"));

        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/nci_researcher");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToEdit));
    }

    @Test
    public void editResourceNoChangesToView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceToEdit = "1000 Genomes NOT_EDITED";

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToEdit));

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToEdit, "Edit Resource");

        adminManagePage.clearField(DdapBy.se("inp-label"));
        adminManagePage.fillField(DdapBy.se("inp-label"), resourceToEdit + "_EDITED");

        adminManagePage.findCheckedCheckbox("discovery-access/discovery/dr_joe_elixir");
        adminManagePage.findCheckedCheckbox("discovery-access/discovery/nci_researcher");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/dr_joe_era_commons");
        adminManagePage.findCheckedCheckbox("gcs-file-access/viewer/nci_researcher");

        adminListPage = adminManagePage.updateEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToEdit + "_EDITED"));
    }

    @Test
    public void deleteResource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceToDelete = "1000 Genomes";

        waitForAccessTablesToLoad();
        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToDelete));

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToDelete, "Edit Resource");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem(resourceToDelete)));
    }
}
