package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

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

    public void clickButton(By selector) {
        driver.findElement(selector).click();
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
