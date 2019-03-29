package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

public class DataListPage implements HasNavBar {
    private WebDriver driver;

    public DataListPage(WebDriver driver) {
        this.driver = driver;
        driver.findElement(By.xpath("//h2[contains(text(), 'Explore Data')]"));

    }

    @Override
    public WebDriver getDriver() {
        return driver;
    }

    public DataListItem findDataByName(String resourceName) {
        return new DataListItem(driver, resourceName);
    }
}
