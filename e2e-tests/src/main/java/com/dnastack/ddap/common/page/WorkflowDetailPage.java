package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static junit.framework.TestCase.assertTrue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class WorkflowDetailPage extends AnyDdapPage{

    public WorkflowDetailPage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
        WebElement pageTitle = driver.findElement(DdapBy.se("page-title"));
        assertThat(pageTitle.getText(), equalTo("Workflow Detail"));
    }

    public void assertDetailsArePresent() {
        WebElement jsonEditor = driver.findElement(DdapBy.se("run-json-editor"));
        assertTrue(jsonEditor.isDisplayed());
    }

}
