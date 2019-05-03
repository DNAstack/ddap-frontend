package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ExpandedAccessibleViewItem {

    private final WebDriver driver;
    private WebElement view;

    public ExpandedAccessibleViewItem(WebDriver driver, WebElement view) {
        this.driver = driver;
        this.view = view;
    }

    public void closeMenu() {
        driver.findElement(By.className("mat-menu-content")).click();
    }

    public void requestAccess() {
        WebElement accessBtn = view.findElement(DdapBy.se("get-access-btn"));
        new WebDriverWait(driver, 10).until(d -> accessBtn.isDisplayed());
        accessBtn.click();
    }

    public void goToAccessLink() {
        WebElement link = getAccessLink();
        String href = link.getAttribute("href");
        driver.get(href);
    }

    public WebElement getAccessLink() {
        return driver.findElement(By.xpath(".//*[@data-se = 'access-btn']"));
    }

    public boolean accessRequestFailed() {
        try {
            return getError().isDisplayed();
        } catch (NoSuchElementException nse) {
            return false;
        }
    }

    public WebElement getError() {
        return driver.findElement(By.className("error-container"));
    }

}
