package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class DataDetailPage extends AnyDdapPage {
    public DataDetailPage(WebDriver driver) {
        super(driver);
        driver.findElement(By.xpath("//ddap-resource-detail"));
    }

    public void assertResourcePage(String resourceName) {
        getDriver().findElement(By.xpath("//h2[contains(text(), '" + resourceName + "')]"));
    }
}
