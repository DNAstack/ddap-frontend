package com.dnastack.ddap.common.page;

import org.openqa.selenium.*;

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
        this.view.findElement(By.xpath(".//*[@data-se = 'get-access-btn']"))
                .click();
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
