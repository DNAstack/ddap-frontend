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
        waitForInflightRequests();
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

    public List<WebElement> fetchDatasetResult(String datasetUrl) {
        WebElement datasetInput = driver.findElement(DdapBy.se("dataset-url"));
        WebElement fetchButton = driver.findElement(DdapBy.se("btn-import-dataset"));
        datasetInput.clear();
        datasetInput.sendKeys(datasetUrl);
        fetchButton.click();
        return datasetResultRows();
    }

    private List<WebElement> datasetResultRows() {
        new WebDriverWait(getDriver(), 10)
                .until(ExpectedConditions.presenceOfElementLocated(By.tagName("ddap-dataset-results")));
        WebElement datasetResults = driver.findElement(By.tagName("ddap-dataset-results"));
        datasetResults.click();
        return datasetResults.findElements(By.xpath("//mat-row"));
    }

    public List<WebElement> getAccessTokens(String columnName) {
        fillFieldFromDropdown(DdapBy.se("select-column"), columnName);
        WebElement access = driver.findElement(DdapBy.se("btn-get-access"));
        scrollTo(access);
        access.click();
        new WebDriverWait(driver, 15)
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(DdapBy.se("access-token"), 0));

        return driver.findElements(DdapBy.se("access-token"));
    }

    public void clickCheckbox(By checkboxSelector) {
        WebElement checkbox = driver.findElement(checkboxSelector);

        this.scrollTo(checkbox);

        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(checkbox));
        checkbox.click();
    }
}
