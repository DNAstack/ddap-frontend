package com.dnastack.ddap.common.fragments;

import com.dnastack.ddap.common.util.DdapBy;
import com.dnastack.ddap.common.page.AdminDdapPage;
import com.dnastack.ddap.common.page.AnyDdapPage;
import org.openqa.selenium.WebDriver;

public class ConfirmationRealmChangeDialog {

    private WebDriver driver;

    public ConfirmationRealmChangeDialog(WebDriver driver) {
        this.driver = driver;
    }

    public AnyDdapPage confirmChangeRealmDialog() {
        driver.findElement(DdapBy.se("accept-btn")).click();
        return new AnyDdapPage(driver);
    }

    public AnyDdapPage cancelChangeRealmDialog() {
        driver.findElement(DdapBy.se("cancel-btn")).click();
        return new AdminDdapPage(driver);
    }
}
