package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class DataDetailPage implements HasNavBar {
    private WebDriver driver;

    public DataDetailPage(WebDriver driver) {
        this.driver = driver;
        driver.findElement(By.xpath("//ddap-resource-detail"));
    }

    @Override
    public WebDriver getDriver() {
        return driver;
    }

    public void assertResourcePage(String resourceName) {
        driver.findElement(By.xpath("//h2[contains(text(), '" + resourceName + "')]"));
    }
}
