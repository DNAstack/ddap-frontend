package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import static java.lang.String.format;

public class DataListItem {
    private WebDriver driver;
    private String resourceName;

    public DataListItem(WebDriver driver, String resourceName) {
        this.driver = driver;
        this.resourceName = resourceName;
        getListItem();
    }

    public DataDetailPage clickViewButton() {
        final WebElement listItem = getListItem();
        final WebElement viewButton = listItem.findElement(By.xpath(".//*[@data-se = 'view-set-btn']"));
        // need to wait for button to become visible.
        new WebDriverWait(driver, 5).until(d -> viewButton.isDisplayed());
        viewButton.click();

        return new WebDriverWait(driver, 5).until(DataDetailPage::new);
    }

    private WebElement getListItem() {
        final WebElement we = driver.findElement(By.xpath(format(
                "//mat-card[descendant::*[contains(text(), '%s') and @class='mat-card-title']]",
                resourceName)));
        new WebDriverWait(driver, 50).until(d -> we.isDisplayed());
        return we;
    }
}
