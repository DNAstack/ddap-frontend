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

import java.io.IOException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.not;

@SuppressWarnings("Duplicates")
public class AdminResourceE2eTest extends AbstractFrontendE2eTest {

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
    public void addResourceWithMinimalFieldsAndNoViews() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceId = "resource-" + System.currentTimeMillis();

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
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable"), "http://beacon-test.com");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-discovery"));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-discovery"), "discovery_access");
        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceId));
    }

    @Test
    public void addResourceAndMultipleView() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceId = "resource-" + System.currentTimeMillis();
        String view1Id = "view1-" + System.currentTimeMillis();
        String view2Id = "view2-" + System.currentTimeMillis();

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
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Beacon Discovery Search");
        adminManagePage.fillField(DdapBy.se("inp-view-target-adapter-variable"), "http://beacon-test.com");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-discovery"));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-discovery"), "discovery_access");

        adminManagePage.clickButton(DdapBy.se("btn-add-view"));
        adminManagePage.fillField(DdapBy.se("inp-view-id"), view2Id);
        adminManagePage.fillField(DdapBy.se("inp-view-label"), view2Id);
        adminManagePage.fillField(DdapBy.se("inp-view-version"), "Version 2");
        adminManagePage.fillField(DdapBy.se("inp-view-aud"), "http://audience-test.com");
        adminManagePage.fillFieldFromDropdown(DdapBy.se("inp-view-service-template"), "Google BigQuery");
        adminManagePage.fillField(DdapBy.seAndText("inp-view-target-adapter-variable", "GCP Project ID"), "test");
        adminManagePage.fillField(DdapBy.seAndText("inp-view-target-adapter-variable", "BigQuery Table name"), "test");
        adminManagePage.enterButton(DdapBy.se("btn-make-default-role-editor"));
        adminManagePage.fillTagField(DdapBy.se("view-role-policies-editor"), "discovery_access");
        adminListPage = adminManagePage.saveEntity();

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceId));
    }

    // TODO: editResourceChangeView
    // TODO: editResourceNoChangesToView
    // TODO: editResourceRemoveView
    // TODO: editResourceAddView

    @Test
    public void deleteResource() {
        AdminListPage adminListPage = ddapPage.getNavBar()
                .goToAdmin(NavItem.RESOURCES);
        String resourceToDelete = "1000 Genomes";

        assertThat(adminListPage.getEntityTitles(), hasItem(resourceToDelete));

        AdminManagePage adminManagePage = adminListPage.clickView(resourceToDelete, "View");

        adminListPage = adminManagePage.deleteEntity();

        assertThat(adminListPage.getEntityTitles(), not(hasItem(resourceToDelete)));
    }
}
