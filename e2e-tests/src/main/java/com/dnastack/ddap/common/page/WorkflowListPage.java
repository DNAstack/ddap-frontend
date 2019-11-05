package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.WorkflowRunState;
import com.dnastack.ddap.common.util.DdapBy;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@Slf4j
public class WorkflowListPage extends AnyDdapPage {

    private List<String> workflowRunIds = new ArrayList<>();

    public WorkflowListPage(WebDriver driver, Integer expectedNumberOfNewWorkflowRuns) {
        super(driver);
        waitForInflightRequests();
        WebElement pageTitle = driver.findElement(DdapBy.se("page-title"));
        assertThat(pageTitle.getText(), equalTo("Workflow Runs"));
        extractNewWorkflowIdsIfExists(expectedNumberOfNewWorkflowRuns);
    }

    private void extractNewWorkflowIdsIfExists(Integer expectedNumberOfNewWorkflowRuns) {
        workflowRunIds = driver.findElements(DdapBy.se("new-run-id"))
                .stream()
                .map(WebElement::getText)
                .collect(toList());
        if (expectedNumberOfNewWorkflowRuns != null) {
            assertThat(workflowRunIds, hasSize(equalTo(expectedNumberOfNewWorkflowRuns)));
        }
    }

    public WorkflowManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();
        return new WorkflowManagePage(driver);
    }

    public WorkflowDetailPage viewRunDetails() {
        new WebDriverWait(driver, 10)
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(DdapBy.se("run"), 0));
        List<WebElement> runs = driver.findElements(DdapBy.se("run"));
        runs.get(0).click();
        driver.findElement(DdapBy.se("view-btn")).click();
        // Fixes failure where detail page hadn't loaded yet
        return new WebDriverWait(driver, 10).until(WorkflowDetailPage::new);
    }

    public void assertNewRunsInState(List<WorkflowRunState> acceptedStates) {
        reloadPageUntilNewRunsNotInState(acceptedStates, 15, 0);
    }

    private void reloadPageUntilNewRunsNotInState(List<WorkflowRunState> acceptedStates, int maxReloads, int currentReload) {
        waitForInflightRequests();
        List<WebElement> allRuns = driver.findElements(DdapBy.se("run"));
        List<WebElement> newRuns = allRuns.stream()
                .filter((run) -> {
                    String runId = run.findElement(DdapBy.se("run-id")).getText();
                    return workflowRunIds.contains(runId);
                })
                .collect(toList());
        boolean allInExpectedState = newRuns.stream()
                .allMatch((newRun) -> {
                    String state = newRun.findElement(DdapBy.se("run-state")).getText();
                    return acceptedStates.stream()
                            .map(Enum::name)
                            .anyMatch(s -> s.equals(state));
                });

        if (newRuns.isEmpty() || !allInExpectedState) {
            assertThat("Failed to assert states of new workflow runs within valid reload duration", currentReload, lessThanOrEqualTo(maxReloads));
            driver.navigate().refresh();
            reloadPageUntilNewRunsNotInState(acceptedStates, maxReloads, ++currentReload);
        }
    }

}
