package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class WorkflowListPage extends AnyDdapPage {

    public WorkflowListPage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
        WebElement pageTitle = driver.findElement(DdapBy.se("page-title"));
        assertThat(pageTitle.getText(), equalTo("Workflows"));
    }

    public WorkflowManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();
        return new WorkflowManagePage(driver);
    }

    public void assertJobInRunningState() {
        reloadPageUntilNewJobVisible(3, 0);
        assertThat(driver.findElement(DdapBy.se("run-state")).getText(), equalTo("RUNNING"));
    }

    private void reloadPageUntilNewJobVisible(int maxReloads, int currentReload) {
        try {
            waitForInflightRequests();
            driver.findElement(DdapBy.se("run-state"));
        } catch (NoSuchElementException nse) {
            if (currentReload < maxReloads) {
                driver.navigate().refresh();
                reloadPageUntilNewJobVisible(maxReloads, ++currentReload);
            } else {
                throw nse;
            }
        }
    }
}
