package com.dnastack.ddap.page;

import org.openqa.selenium.WebDriver;

public interface HasNavBar {
    WebDriver getDriver();
    default NavBar getNavBar() {
        return new NavBar(getDriver());
    }
}
