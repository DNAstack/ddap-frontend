package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.html5.LocalStorage;
import org.openqa.selenium.html5.WebStorage;
import org.openqa.selenium.remote.Augmenter;

@Slf4j
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
            WebStorage webStorage = (WebStorage) new Augmenter().augment(driver);
            LocalStorage localStorage = webStorage.getLocalStorage();
            String acknowledged = localStorage.getItem("sandbox-warning-acknowledgement");
            if (!Boolean.valueOf(acknowledged)) {
                this.driver.findElement(DdapBy.se("accept-sandbox-warning"))
                        .click();
            }
        } catch (NoSuchElementException nsee) {
            // intentionally left empty
        }
    }
}
