package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.util.DdapBy;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static java.lang.String.format;

public class AdminListPage extends AdminDdapPage {

    public AdminListPage(WebDriver driver) {
        super(driver);
    }

    public AdminManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();
        return new AdminManagePage(driver);
    }

    public AdminManagePage clickView(String resourceName, String buttonText) {
        driver.findElement(getLine(resourceName))
                .click();

        final WebElement viewButton = driver.findElement(getButton(resourceName, buttonText));
        // need to wait for button to become visible.
        new WebDriverWait(driver, 5).until(d -> viewButton.isDisplayed());

        viewButton.click();

        return new AdminManagePage(driver);
    }

    public AdminListPage clickDescriptionLink() {
        driver.findElement(By.tagName("ddaplib-entity-description-link")).click();
        return new AdminListPage(driver);
    }

    public void assertListItemExists(String title) {
        new WebDriverWait(driver, 2)
                .until(ExpectedConditions.visibilityOfAllElementsLocatedBy(DdapBy.seAndText("entity-title", title)));
    }

    public void assertListItemDoNotExist(String title) {
        new WebDriverWait(driver, 2)
                .until(ExpectedConditions.invisibilityOfElementLocated(DdapBy.seAndText("entity-title", title)));
    }

    private By getLine(String resourceName) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s') and @data-se='entity-title']]",
                resourceName
        ));
    }

    private By getButton(String resourceName, String buttonText) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s') and @data-se='entity-title']]//button[descendant::*[contains(text(), '%s')]]",
                resourceName,
                buttonText
        ));
    }
}
