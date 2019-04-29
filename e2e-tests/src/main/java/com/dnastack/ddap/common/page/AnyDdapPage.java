package com.dnastack.ddap.common.page;

import org.openqa.selenium.WebDriver;

public class AnyDdapPage {

    private WebDriver driver;

    public AnyDdapPage(WebDriver driver) {
        this.driver = driver;
    }

    protected WebDriver getDriver() {
        return driver;
    }

    public NavBar getNavBar() {
        return new NavBar(getDriver());
    }
}
