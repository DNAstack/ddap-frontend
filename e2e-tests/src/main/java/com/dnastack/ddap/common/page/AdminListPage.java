package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.stream.Collectors;

import static java.lang.String.format;

public class AdminListPage {
    @Getter
    private WebDriver driver;

    public AdminListPage(WebDriver driver) {
        this.driver = driver;
    }

    public AdminManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();

        return new AdminManagePage(driver);
    }

    public AdminManagePage clickEdit(String resourceName) {
        driver.findElement(getLine(resourceName))
                .click();

        driver.findElement(getButton(resourceName, "View"))
                .click();

        return new AdminManagePage(driver);
    }

    public List<String> getEntityList() {
        new WebDriverWait(driver, 5).until(d -> driver.findElement(DdapBy.se("entity-title")).isDisplayed());

        return driver.findElements(DdapBy.se("entity-title")).stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    private By getLine(String resourceName) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s')] and descendant::button//*[text() = 'View']]",
                resourceName));
    }

    private By getButton(String resourceName, String buttonText) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s')]]//button[descendant::*[contains(text(), 'View')]]",
                resourceName));
    }
}
