package com.dnastack.ddap.common.page;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class AdminManagePage {
    @Getter
    private WebDriver driver;

    public AdminManagePage(WebDriver driver) {
        this.driver = driver;
    }

    public void fillField(By fieldSelector, String fieldValue) {
        driver.findElement(fieldSelector).sendKeys(fieldValue);
    }

    public void clickButton(By selector) {
        driver.findElement(selector).click();
    }

    public AdminListPage submitForm() {
        driver.findElement(By.cssSelector("button[type='submit']")).click();
        return new AdminListPage(driver);
    }
}
