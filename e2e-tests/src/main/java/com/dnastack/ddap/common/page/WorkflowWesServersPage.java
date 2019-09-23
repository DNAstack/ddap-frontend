package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class WorkflowWesServersPage extends AnyDdapPage {

    public WorkflowWesServersPage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
        WebElement pageTitle = driver.findElement(DdapBy.se("page-title"));
        assertThat(pageTitle.getText(), equalTo("WES Servers"));
    }

    public WorkflowListPage clickViewRuns() {
        waitForInflightRequests();
        List<WebElement> viewRunsBtns = driver.findElements(DdapBy.se("view-btn"));
        viewRunsBtns.get(0).click();
        return new WorkflowListPage(driver, null);
    }

    public WorkflowManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();
        return new WorkflowManagePage(driver);
    }

}
