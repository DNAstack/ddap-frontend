package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.hamcrest.Matcher;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.junit.Assert.assertThat;

public class WorkflowManagePage extends AnyDdapPage {

    public WorkflowManagePage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
    }

    public void clearField(By fieldSelector) {
        String selectAll = Keys.chord(Keys.CONTROL, "a");
        WebElement formInput = driver.findElement(fieldSelector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(formInput));
        formInput.sendKeys(selectAll);
        formInput.sendKeys(Keys.DELETE);
    }

    public void fillField(By fieldSelector, String fieldValue) {
        WebElement formInput = new WebDriverWait(driver, 10)
                .until(ExpectedConditions.elementToBeClickable(fieldSelector));
        formInput.sendKeys(fieldValue);
    }

    public void fillFieldFromDropdown(By fieldSelector, String fieldValue) {
        WebElement field = driver.findElement(fieldSelector);

        new WebDriverWait(driver, 5)
                .until(ExpectedConditions.elementToBeClickable(field));
        // This dismisses any previous auto-complete suggestions in other fields.
        field.sendKeys(Keys.ENTER);

        List<WebElement> options = driver.findElements(By.tagName("mat-option"));

        if (fieldValue != null) {
            WebElement option =
                    new WebDriverWait(driver, 5)
                            .until(ExpectedConditions.visibilityOfElementLocated(By.xpath(
                                    "//mat-option/span[contains(text(), '" + fieldValue + "')]")));

            option.click();
        } else {
            options.get(0).click();
        }
    }

    public void fillFieldWithFirstValueFromDropdown(By fieldSelector) {
        fillFieldFromDropdown(fieldSelector, null);
    }

    public void enterButton(By selector) {
        WebElement button = driver.findElement(selector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(button));
        this.scrollTo(button);
        button.sendKeys(Keys.ENTER);
    }

    public void clickButton(By selector) {
        WebElement button = driver.findElement(selector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(button));
        this.scrollTo(button);
        button.click();
    }

    public WorkflowListPage saveEntity() {
        clickSave();

        return new WorkflowListPage(driver);
    }

    public void clickSave() {
        this.clickButton(DdapBy.se("btn-execute"));
    }

    public boolean hasErrors() {
        return !driver.findElements(By.tagName("mat-error")).isEmpty();
    }

    public void assertError(Matcher<String> messageMatcher) {
        try {
            final WebElement errorField = new WebDriverWait(driver, 5).until(ExpectedConditions.visibilityOfElementLocated(By.tagName("mat-error")));
            assertThat(errorField.getText(), messageMatcher);
        } catch (NoSuchElementException nsee) {
            throw new AssertionError("No error tag found.", nsee);
        }
    }

    private void scrollTo(WebElement element) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
    }
}
