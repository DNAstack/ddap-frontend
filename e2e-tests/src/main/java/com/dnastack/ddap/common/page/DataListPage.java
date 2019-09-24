package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.fragments.DataListItem;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class DataListPage extends AnyDdapPage {

    public DataListPage(WebDriver driver) {
        super(driver);
        WebElement pageTitle = driver.findElement(DdapBy.se("page-title"));
        assertThat(pageTitle.getText(), equalTo("Explore Data"));
    }

    public DataListItem findDataByName(String resourceName) {
        return new DataListItem(getDriver(), resourceName);
    }

}
