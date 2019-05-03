package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ViewAccessMenu {

    private final WebDriver driver;

    public ViewAccessMenu(WebDriver driver) {
        this.driver = driver;
        new WebDriverWait(driver, 10)
                .until(ExpectedConditions.elementToBeClickable(By.className("mat-menu-content")));
    }

    public void goToAccessLink() {
        WebElement link = getAccessLink();
        String href = link.getAttribute("href");
        driver.get(href);
    }

    public WebElement getAccessLink() {
        return driver.findElement(By.xpath(".//*[@data-se = 'access-btn']"));
    }

    public void closeMenu() {
        driver.findElement(By.className("mat-menu-content")).click();
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
