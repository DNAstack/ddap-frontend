package com.dnastack.ddap.common.page;

import org.openqa.selenium.WebDriver;

public interface HasNavBar {
    WebDriver getDriver();
    default NavBar getNavBar() {
        return new NavBar(getDriver());
    }
}
