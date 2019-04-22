package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class RealmPage implements HasNavBar {

    private WebDriver driver;

    @Override
    public WebDriver getDriver() {
        return driver;
    }

    public RealmPage(WebDriver driver) {
        this.driver = driver;
    }

    private WebElement getRealmInput() {
        return driver.findElement(DdapBy.se("inp-id"));
    }

    public ICLoginPage setRealm(String targetRealm) {
        WebElement realmInput = getRealmInput();

        realmInput.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.BACK_SPACE);
        realmInput.sendKeys(targetRealm);

        driver.findElement(DdapBy.se("btn-change-realm")).click();
        return new ICLoginPage(driver);
    }
}
