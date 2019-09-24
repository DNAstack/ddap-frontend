package com.dnastack.ddap.common.fragments;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ExpandedAccessibleViewItem {

    private final WebDriver driver;
    private WebElement view;

    public ExpandedAccessibleViewItem(WebDriver driver, WebElement view) {
        this.driver = driver;
        this.view = view;
    }

    public ViewAccessMenu requestAccess() {
        WebElement accessBtn = view.findElement(DdapBy.se("get-access-btn"));
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(accessBtn));
        accessBtn.click();
        return new ViewAccessMenu(driver);
    }

    public String getDownloadLink() {
        return view.findElement(DdapBy.se("download-cli-button")).getAttribute("href");
    }
}
