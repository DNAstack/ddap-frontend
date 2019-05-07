package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class AdminManagePage {
    @Getter
    private WebDriver driver;

    public AdminManagePage(WebDriver driver) {
        this.driver = driver;
    }

    public void clearField(By fieldSelector) {
        String selectAll = Keys.chord(Keys.CONTROL, "a");
        WebElement formInput = driver.findElement(fieldSelector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(formInput));
        formInput.sendKeys(selectAll);
        formInput.sendKeys(Keys.DELETE);
    }

    public void fillField(By fieldSelector, String fieldValue) {
        WebElement formInput = driver.findElement(fieldSelector);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(formInput));
        formInput.sendKeys(fieldValue);
    }

    public void fillFieldFromDropdown(By fieldSelector, String fieldValue) {
        driver.findElement(fieldSelector).click();

        List<WebElement> options = driver.findElements(By.tagName("mat-option"));

        if (fieldValue != null) {
            WebElement option = driver.findElement(By.xpath("//mat-option/span[contains(text(), '"+fieldValue+"')]"));
            new WebDriverWait(driver, 5)
                    .until(ExpectedConditions.visibilityOf(option));

            option.click();
        } else {
            options.get(0).click();
        }
    }

    public void fillFieldWithFirstValueFromDropdown(By fieldSelector) {
        fillFieldFromDropdown(fieldSelector, null);
    }

    public void clickCheckbox(By checkboxSelector) {
        driver.findElement(checkboxSelector).click();
    }

    public void clickButton(By selector) {
        driver.findElement(selector).click();
    }

    public void closeAutocompletes() {
        driver.findElement(By.tagName("h1")).click();
    }

    public AdminListPage saveEntity() {
        driver.findElement(DdapBy.se("btn-save"))
                .click();

        return new AdminListPage(driver);
    }

    public AdminListPage updateEntity() {
        driver.findElement(DdapBy.se("btn-update"))
                .click();

        return new AdminListPage(driver);
    }

    public AdminListPage deleteEntity() {
        driver.findElement(DdapBy.se("btn-delete"))
                .click();

        return new AdminListPage(driver);
    }

    public boolean hasErrors() {
        return !driver.findElements(By.tagName("mat-error")).isEmpty();
    }
}
