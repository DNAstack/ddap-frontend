package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.Getter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import static java.lang.String.format;

public class AdminListPage {
    @Getter
    private WebDriver driver;

    public AdminListPage(WebDriver driver) {
        this.driver = driver;
    }

    public AdminManagePage clickManage() {
        driver.findElement(DdapBy.se("btn-manage"))
                .click();

        return new AdminManagePage(driver);
    }

    public void assertItemInList(String resourceName) {
        driver.findElement(By.xpath(format(
                "//mat-expansion-panel[descendant::*[contains(text(), '%s')] and descendant::button//*[text() = 'View']]",
                resourceName)));
    }
}
