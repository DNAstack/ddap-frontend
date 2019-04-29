package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class DataListPage extends AnyDdapPage {
    public DataListPage(WebDriver driver) {
        super(driver);
        driver.findElement(By.xpath("//h2[contains(text(), 'Explore Data')]"));

    }

    public DataListItem findDataByName(String resourceName) {
        return new DataListItem(getDriver(), resourceName);
    }
}
