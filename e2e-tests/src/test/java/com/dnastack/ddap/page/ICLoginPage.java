package com.dnastack.ddap.page;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ICLoginPage implements HasNavBar {
    @Getter
    private WebDriver driver;

    public ICLoginPage(WebDriver driver) {
        this.driver = driver;
        driver.findElement(By.xpath("//a[contains(text(), 'nci_researcher')]"));
    }

    public HasNavBar loginAsNciResearcher() {
        driver.findElement(By.xpath("//a[contains(text(), 'nci_researcher')]")).click();
        return new AnyDdapPage(driver);
    }

}
