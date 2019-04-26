package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.WebDriver;

public class ConfirmationRealmChangeDialog {

    private WebDriver driver;

    public ConfirmationRealmChangeDialog(WebDriver driver) {
        this.driver = driver;
    }

    public ICLoginPage confirmChangeRealmDialog() {
        driver.findElement(DdapBy.se("accept-btn")).click();
        return new ICLoginPage(driver);
    }

    public AnyDdapPage cancelChangeRealmDialog() {
        driver.findElement(DdapBy.se("cancel-btn")).click();
        return new AnyDdapPage(driver);
    }
}
