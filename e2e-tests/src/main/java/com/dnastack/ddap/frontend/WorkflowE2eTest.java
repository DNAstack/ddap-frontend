package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import com.dnastack.ddap.common.page.WorkflowListPage;
import com.dnastack.ddap.common.page.WorkflowManagePage;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

public class WorkflowE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(WorkflowE2eTest.class.getSimpleName());

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
    public void testWorkflowExecution() {
        WorkflowListPage workflowListPage = ddapPage.getNavBar()
                .goToWorkflows();
        WorkflowManagePage managePage = workflowListPage.clickManage();

        managePage.fillFieldWithFirstValueFromDropdown(DdapBy.se("inp-workflow-wes-view"));
        managePage.fillField(DdapBy.se("inp-workflow-wdl"), loadTemplate("/com/dnastack/ddap/workflow/workflow.wdl"));
        managePage.fillField(DdapBy.se("inp-workflow-inputs"), loadTemplate("/com/dnastack/ddap/workflow/inputs.json"));

        workflowListPage = managePage.saveEntity();
        workflowListPage.assertJobInRunningState();
    }

}
