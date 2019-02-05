package com.dnastack.ddap.page;

import lombok.Getter;
import org.openqa.selenium.WebDriver;

public class AnyDdapPage implements HasNavBar {
    @Getter
    private WebDriver driver;

    public AnyDdapPage(WebDriver driver) {
        this.driver = driver;
        getNavBar();
    }
}
