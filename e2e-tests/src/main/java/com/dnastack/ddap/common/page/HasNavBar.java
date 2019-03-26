package com.dnastack.ddap.common.page;

import org.openqa.selenium.WebDriver;

// FIXME this should be an abstract base class
public interface HasNavBar {
    WebDriver getDriver();
    default NavBar getNavBar() {
        return new NavBar(getDriver());
    }
}
