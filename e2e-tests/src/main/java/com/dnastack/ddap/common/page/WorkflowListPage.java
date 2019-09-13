package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@Slf4j
public class WorkflowListPage extends AnyDdapPage {

    private String workflowRunId;

    public WorkflowListPage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
        WebElement pageTitle = driver.findElement(DdapBy.se("page-title"));
        assertThat(pageTitle.getText(), equalTo("Workflows"));
        extractWorkflowIdFromSnackbarIfExists();
    }

    private void extractWorkflowIdFromSnackbarIfExists() {
        try {
            String text = driver.findElement(By.tagName("simple-snack-bar")).getText();
            Pattern uuidPattern = Pattern.compile("\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b");
            Matcher uuidMatcher = uuidPattern.matcher(text);
            if (uuidMatcher.find()) {
                workflowRunId = uuidMatcher.group();
            }
        } catch (NoSuchElementException | IllegalStateException e) {
            // Intentionally left empty
        }
    }

    public WorkflowManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();
        return new WorkflowManagePage(driver);
    }

    public void assertJobInRunningState() throws InterruptedException {
        reloadPageUntilNewJobVisible(15, 0);
        assertThat(driver.findElement(DdapBy.se("run-state")).getText(), equalTo("RUNNING"));
    }

    public WorkflowDetailPage viewRunDetails() {
        new WebDriverWait(driver, 10)
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(DdapBy.se("run"), 0));
        List<WebElement> runs = driver.findElements(DdapBy.se("run"));
        runs.get(0).click();
        driver.findElement(DdapBy.se("view-btn")).click();
        return new WorkflowDetailPage(driver);
    }

    private void reloadPageUntilNewJobVisible(int maxReloads, int currentReload) throws InterruptedException {
        try {
            waitForInflightRequests();
            List<WebElement> runs = driver.findElements(DdapBy.se("run"));
            Optional<WebElement> foundRun = runs.stream()
                    .filter((run) -> {
                        String runId = run.findElement(DdapBy.se("run-id")).getText();
                        return runId.equals(workflowRunId);
                    })
                    .findFirst();
            if (foundRun.isPresent()) {
                String state = foundRun.get().findElement(DdapBy.se("run-state")).getText();
                if (!state.equals("RUNNING")) {
                    waitAndReloadPage(maxReloads, currentReload);
                }
            } else {
                waitAndReloadPage(maxReloads, currentReload);
            }
        } catch (NoSuchElementException nse) {
            if (currentReload < maxReloads) {
                waitAndReloadPage(maxReloads, currentReload);
            } else {
                throw nse;
            }
        }
    }

    private void waitAndReloadPage(int maxReloads, int currentReload) throws InterruptedException {
        Thread.sleep(5_000);
        driver.navigate().refresh();
        reloadPageUntilNewJobVisible(maxReloads, ++currentReload);
    }
}
