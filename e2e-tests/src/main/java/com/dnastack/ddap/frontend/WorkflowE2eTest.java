package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.util.List;

import static org.junit.Assert.assertFalse;

public class WorkflowE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(WorkflowE2eTest.class.getSimpleName());

    private static String datasetUrl = optionalEnv(
            "E2E_DATASET_URL",
            "https://storage.googleapis.com/ddap-test-objects/dataset/subjects-with-objects"
    );

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig("administrator", testConfig, "1", REALM);
    }

    @Override
    protected String getRealm() {
        return REALM;
    }

    @Override
    protected AnyDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsNciResearcher(AnyDdapPage::new);
    }

    @Test
    public void testSimpleWorkflowExecution() {
        WorkflowListPage workflowListPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        managePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-workflow-wes-view"));
        managePage.fillField(DdapBy.se("inp-workflow-wdl"), loadTemplate("/com/dnastack/ddap/workflow/workflow.wdl"));
        managePage.fillField(DdapBy.se("inp-workflow-inputs"), loadTemplate("/com/dnastack/ddap/workflow/inputs.json"));

        workflowListPage = managePage.saveEntity();
        workflowListPage.assertJobInRunningState();
    }

    @Test
    public void testFetchingDataset() {
        WorkflowListPage workflowListPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        List<WebElement> datasetRows = managePage.fetchDatasetResult(datasetUrl);
        assertFalse(datasetRows.isEmpty());
    }

    @Test
    public void accessTokensForValidUrlColumns() {
        WorkflowListPage workflowListPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        managePage.fetchDatasetResult(datasetUrl);
        managePage.clickCheckbox(DdapBy.se("checkbox-2"));
        managePage.clickCheckbox(DdapBy.se("checkbox-3"));
        managePage.getAccessTokens("bam_file");
    }

    @Test
    public void workflowRunDetails() {
        WorkflowListPage workflowListPage = ddapPage.getNavBar().goToWorkflows();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        managePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-workflow-wes-view"));
        managePage.fillField(DdapBy.se("inp-workflow-wdl"), loadTemplate("/com/dnastack/ddap/workflow/workflow.wdl"));
        managePage.fillField(DdapBy.se("inp-workflow-inputs"), loadTemplate("/com/dnastack/ddap/workflow/inputs.json"));

        workflowListPage = managePage.saveEntity();

        WorkflowDetailPage runDetailsPage = workflowListPage.viewRunDetails();
        runDetailsPage.assertDetailsArePresent();
    }

}
