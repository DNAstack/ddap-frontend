package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.util.DdapBy;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

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
        WebElement searchQueryInput = getDriver().findElement(By.xpath("//*[@data-se=\"" + SEARCH_INPUT_SELECTOR + "\"]"));
        searchQueryInput.clear();
        searchQueryInput.sendKeys(query + Keys.ENTER);
    }

    public List<WebElement> getSearchResults(Integer expectedNumberOfResults) {
        new WebDriverWait(getDriver(), 15)
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(By.tagName("ddap-beacon-result"), --expectedNumberOfResults));
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
