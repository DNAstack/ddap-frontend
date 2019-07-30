package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated;

public class AdminDdapPage extends AnyDdapPage {

    public AdminDdapPage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
    }

    public void waitForInflightRequests() {
        new WebDriverWait(driver,
                5).until(invisibilityOfElementLocated(By.xpath("//mat-progress-bar[contains(@class, 'main-progress-bar')]")));
    }
}
