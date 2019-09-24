package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.util.DdapBy;
import com.dnastack.ddap.common.util.WebPageScroller;
import org.hamcrest.Matcher;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.junit.Assert.assertThat;

public class AdminManagePage extends AdminDdapPage {

    public AdminManagePage(WebDriver driver) {
        super(driver);
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

    public void fillTagField(By fieldSelector, String value) {
        WebElement tagInput = new WebDriverWait(driver,
                                                5).until(ExpectedConditions.elementToBeClickable(fieldSelector));
        WebPageScroller.scrollTo(driver, tagInput);
        tagInput.click();
        tagInput.findElement(By.tagName("input")).sendKeys(value, Keys.ENTER);
    }

    public void clickCheckbox(By checkboxSelector) {
        WebElement checkbox = driver.findElement(checkboxSelector);
        WebPageScroller.scrollTo(driver, checkbox);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(checkbox));
        checkbox.click();
    }

    public WebElement findCheckedCheckbox(String checkboxId) {
        WebElement checkbox = new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(By.xpath(
                "//mat-checkbox[@id='" + checkboxId + "' and contains(@class, 'mat-checkbox-checked')]")));
        WebPageScroller.scrollTo(driver, checkbox);
        return checkbox;
    }

    public WebElement findCheckbox(String checkboxId) {
        WebElement checkbox = driver.findElement(By.xpath("//mat-checkbox[@id='" + checkboxId + "']"));
        WebPageScroller.scrollTo(driver, checkbox);

        return new WebDriverWait(driver, 5)
                .until(ExpectedConditions.elementToBeClickable(checkbox));
    }

    public void toggleCheckboxAndWaitForValidation(String checkboxId) {
        final WebElement gcsReadCheckbox = findCheckbox(checkboxId);

        gcsReadCheckbox.click();
        // If we don't wait, submitting the form will happen before validation can occur.
        new WebDriverWait(driver, 5)
                .until(d -> gcsReadCheckbox.getAttribute("class").contains("ng-invalid"));
    }

    public void toggleExpansionPanel(String panelId) {
        WebElement panel = driver.findElement(DdapBy.se(panelId));
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(panel));
        WebPageScroller.scrollTo(driver, panel);
        panel.click();
    }

    public void enterButton(By selector) {
        WebElement button = driver.findElement(selector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(button));
        WebPageScroller.scrollTo(driver, button);
        button.sendKeys(Keys.ENTER);
    }

    public void clickButton(By selector) {
        WebElement button = driver.findElement(selector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(button));
        WebPageScroller.scrollTo(driver, button);
        button.click();
    }

    public void closeAutocompletes() {
        driver.findElement(By.tagName("h1")).click();
    }

    public AdminListPage saveEntity() {
        clickSave();

        return new AdminListPage(driver);
    }

    public void clickSave() {
        this.clickButton(DdapBy.se("btn-save"));
    }

    public AdminListPage updateEntity() {
        clickUpdate();

        return new AdminListPage(driver);
    }

    public void clickUpdate() {
        this.clickButton(DdapBy.se("btn-update"));
    }

    public AdminListPage deleteEntity() {
        this.clickButton(DdapBy.se("btn-delete"));

        return new AdminListPage(driver);
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

}
