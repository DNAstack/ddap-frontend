package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertTrue;

public class AdminManagePage {
    @Getter
    private WebDriver driver;

    public AdminManagePage(WebDriver driver) {
        this.driver = driver;
    }

    public void clearField(By fieldSelector) {
        driver.findElement(fieldSelector).clear();
    }

    public void fillField(By fieldSelector, String fieldValue) {
        driver.findElement(fieldSelector).sendKeys(fieldValue);
    }

    public void fillFieldFromDropdown(By fieldSelector, String fieldValue) {
        driver.findElement(fieldSelector).click();

        List<WebElement> options = driver.findElements(By.tagName("mat-option"));
        new WebDriverWait(driver, 5).until(d -> !options.isEmpty());

        if (fieldValue != null) {
            Optional<WebElement> option = options.stream()
                    .filter((element) -> element.getText().contains(fieldValue))
                    .findFirst();
            assertTrue(option.isPresent());
            option.get().click();
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
}
