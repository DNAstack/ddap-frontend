package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.stream.Collectors;

public class IdentityPage extends AnyDdapPage {

    public IdentityPage(WebDriver driver) {
        super(driver);
        driver.findElement(By.xpath("//h2[contains(text(), 'My Identity')]"));

    }

    public List<String> getLinkableIdentities() {
        return getDriver().findElement(By.className("ddap-available-accounts"))
            .findElements(By.tagName("mat-card-subtitle")).stream()
            .map(WebElement::getText)
            .collect(Collectors.toList());
    }

    public List<String> getLinkedIdentities() {
        return getDriver().findElement(By.className("ddap-connected-accounts"))
            .findElements(By.tagName("mat-card-subtitle")).stream()
            .map(WebElement::getText)
            .collect(Collectors.toList());
    }

}
