package com.dnastack.ddap.common.page;

import java.util.List;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SearchPage extends AnyDdapPage {

    private static final String SEARCH_REVEAL_BUTTON_SELECTOR = "search-reveal";
    private static final String SEARCH_INPUT_SELECTOR = "search-input";
    private static final By SEARCH_HEADER = By.xpath("//*[@data-se=\"" + SEARCH_REVEAL_BUTTON_SELECTOR + "\"]");

    public SearchPage(WebDriver driver) {
        super(driver);
        driver.findElement(SEARCH_HEADER);
    }

    public void openSearchInput() {
        getDriver().findElement(By.xpath("//*[@data-se=\"" + SEARCH_REVEAL_BUTTON_SELECTOR + "\"]"))
            .click();
    }

    public void submitSearchQuery(String query) {
        getDriver().findElement(By.xpath("//*[@data-se=\"" + SEARCH_INPUT_SELECTOR + "\"]"))
            .sendKeys(query + Keys.ENTER);
    }

    public List<WebElement> getSearchResults() {
        return getDriver().findElements(By.tagName("ddap-beacon-result"));
    }

    public void clickBack() {
        getDriver().findElement(DdapBy.se("search-back-link"))
                .click();
    }

    public void clickBRCA2() {
        getDriver().findElement(DdapBy.se("brca2-link"))
                .click();
    }

    public void clickLimitSearch() {
        getDriver().findElement(DdapBy.se("limit-search"));
    }
}
