package com.dnastack.ddap.common.page;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ICLoginPage implements HasNavBar {
    @Getter
    private WebDriver driver;

    private final By loginButton = By.xpath("//a[contains(@href, 'dr_joe_era_commons')]");

    public ICLoginPage(WebDriver driver) {
        this.driver = driver;
        driver.findElement(loginButton);
    }

    public HasNavBar loginAsNciResearcher() {
        driver.findElement(loginButton).click();
        return new AnyDdapPage(driver);
    }

}
