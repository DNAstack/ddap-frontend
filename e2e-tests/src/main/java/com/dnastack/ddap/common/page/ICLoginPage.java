package com.dnastack.ddap.common.page;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.function.Function;

public class ICLoginPage implements HasNavBar {

    @Getter
    private WebDriver driver;

    private final By loginButton = By.xpath("//a[contains(@href, 'nci_researcher')]");

    public ICLoginPage(WebDriver driver) {
        this.driver = driver;
        driver.findElement(loginButton);
    }

    public <T extends HasNavBar> T loginAsNciResearcher(Function<WebDriver, T> pageConstructor) {
        driver.findElement(loginButton).click();
        return pageConstructor.apply(driver);
    }

}
