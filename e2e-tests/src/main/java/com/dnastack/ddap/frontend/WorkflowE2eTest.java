package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;

import java.io.IOException;

import static com.dnastack.ddap.common.WorkflowRunState.*;
import static java.util.Arrays.asList;

public class WorkflowE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(WorkflowE2eTest.class.getSimpleName());

    private static String datasetUrl = optionalEnv(
            "E2E_DATASET_URL",
            "https://storage.googleapis.com/ddap-e2etest-objects/dataset/subjects-with-objects"
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
    public void testSingleSimpleWorkflowExecution() {
        WorkflowServersPage workflowServersPage = ddapPage.getNavBar()
                .goToWorkflows();
        workflowServersPage.clickViewRuns();
        WorkflowManagePage managePage = workflowServersPage.clickManage();

        managePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-workflow-wes-view"));
        managePage.fillField(DdapBy.se("inp-workflow-wdl"), loadTemplate("/com/dnastack/ddap/workflow/simple-workflow.wdl"));
        managePage.clickButton(DdapBy.se("btn-generate-form"));
        managePage.waitForInflightRequests();
        managePage.fillField(By.name("test.name"), "e2e-test");

        WorkflowListPage workflowListPage = managePage.saveEntity(1);
        workflowListPage.assertNewRunsInState(asList(RUNNING, COMPLETE));

        WorkflowDetailPage runDetailsPage = workflowListPage.viewRunDetails();
        runDetailsPage.assertDetailsArePresent();
    }

    @Test
    public void testSingleWorkflowExecutionWithTokens() {
        WorkflowServersPage workflowServersPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowManagePage managePage = workflowServersPage.clickManage();

        managePage.fetchDatasetResult(datasetUrl);
        managePage.waitForInflightRequests();
        managePage.clickCheckbox(DdapBy.se("checkbox-0"));
        managePage.getAccessTokens("bam_file");
        managePage.waitForInflightRequests();

        managePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-workflow-wes-view"));
        managePage.fillField(DdapBy.se("inp-workflow-wdl"), loadTemplate("/com/dnastack/ddap/workflow/with-tokens-workflow.wdl"));
        managePage.clickButton(DdapBy.se("btn-generate-form"));
        managePage.waitForInflightRequests();
        managePage.fillFieldFromDropdown(By.name("md5Sum.inputFile"), "bam_file");

        WorkflowListPage workflowListPage = managePage.saveEntity(1);
        workflowListPage.assertNewRunsInState(asList(QUEUED, RUNNING, COMPLETE));
    }

    @Test
    public void testMultipleWorkflowExecutionWithTokens() {
        WorkflowServersPage workflowServersPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowListPage workflowListPage = workflowServersPage.clickViewRuns();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        managePage.fetchDatasetResult(datasetUrl);
        managePage.waitForInflightRequests();
        managePage.clickCheckbox(DdapBy.se("checkbox-0"));
        managePage.clickCheckbox(DdapBy.se("checkbox-2"));
        managePage.clickCheckbox(DdapBy.se("checkbox-3"));
        managePage.getAccessTokens("bam_file");
        managePage.waitForInflightRequests();

        managePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-workflow-wes-view"));
        managePage.fillField(DdapBy.se("inp-workflow-wdl"), loadTemplate("/com/dnastack/ddap/workflow/with-tokens-workflow.wdl"));
        managePage.clickButton(DdapBy.se("btn-generate-form"));
        managePage.waitForInflightRequests();
        managePage.fillFieldFromDropdown(By.name("md5Sum.inputFile"), "bam_file");

        workflowListPage = managePage.saveEntity(3);
        workflowListPage.assertNewRunsInState(asList(QUEUED, RUNNING, COMPLETE));
    }

    @Test
    public void accessTokensForValidUrlColumns() {
        WorkflowServersPage workflowServersPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowListPage workflowListPage = workflowServersPage.clickViewRuns();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        managePage.fetchDatasetResult(datasetUrl);
        managePage.waitForInflightRequests();
        managePage.clickCheckbox(DdapBy.se("checkbox-0"));
        managePage.clickCheckbox(DdapBy.se("checkbox-2"));
        managePage.getAccessTokens("bam_file");
    }

}
