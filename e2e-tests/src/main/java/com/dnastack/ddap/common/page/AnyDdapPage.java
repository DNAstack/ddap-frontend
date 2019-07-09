package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;

public class AnyDdapPage {

    protected WebDriver driver;

    public AnyDdapPage(WebDriver driver) {
        this.driver = driver;
        this.acknowledgeSandboxIfAvailable();
    }

    protected WebDriver getDriver() {
        return driver;
    }

    public NavBar getNavBar() {
        return new NavBar(getDriver());
    }

    private void acknowledgeSandboxIfAvailable() {
        try {
            this.driver.findElement(DdapBy.se("accept-sandbox-warning"))
                    .click();
        } catch (NoSuchElementException nsee) {
            // intentionally left empty
        }
    }
}
