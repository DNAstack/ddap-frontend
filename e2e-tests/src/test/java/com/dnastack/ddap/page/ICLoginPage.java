package com.dnastack.ddap.page;

import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ICLoginPage implements HasNavBar {
    @Getter
    private WebDriver driver;

    public ICLoginPage(WebDriver driver) {
        this.driver = driver;
        driver.findElement(By.xpath("//*[text()[contains(.,'nci_researcher')]]"));
    }

    public HasNavBar loginAsNciResearcher() {
        driver.findElement(By.linkText("NCI_RESEARCHER")).click();
        return new AnyDdapPage(driver);
    }

}
