package com.dnastack.ddap.common.page;

import org.openqa.selenium.WebDriver;

public class AdminDdapPage extends AnyDdapPage {

    public AdminDdapPage(WebDriver driver) {
        super(driver);
        waitForInflightRequests();
    }

}
