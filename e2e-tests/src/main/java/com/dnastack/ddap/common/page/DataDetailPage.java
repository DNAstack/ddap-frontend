package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DataDetailPage extends AnyDdapPage {

    public DataDetailPage(WebDriver driver) {
        super(driver);
        driver.findElement(By.xpath("//ddap-resource-detail"));
    }

    public void assertResourcePage(String resourceName) {
        getDriver().findElement(By.xpath("//h2[contains(text(), '" + resourceName + "')]"));
    }

    public ExpandedAccessibleViewItem expandViewItem(String viewLabel) {
        final WebElement viewItem = getViewListItem(viewLabel);
        viewItem.click(); // expand view item
        return new WebDriverWait(getDriver(), 5).until(d -> new ExpandedAccessibleViewItem(d, viewItem));
    }

    private WebElement getViewListItem(String viewName) {
        return getDriver().findElement(By.xpath("//mat-list-item[descendant::*[contains(text(), '" + viewName + "')]]"));
    }
}
