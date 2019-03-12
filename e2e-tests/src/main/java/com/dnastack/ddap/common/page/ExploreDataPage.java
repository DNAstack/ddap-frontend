package com.dnastack.ddap.common.page;

import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ExploreDataPage {

    private static final String SEARCH_REVEAL_BUTTON_SELECTOR = "search-reveal";
    private static final String SEARCH_INPUT_SELECTOR = "search-input";

    public static void openSearchInput(WebDriver driver) {
        driver.findElement(By.xpath("//*[@data-se=\"" + SEARCH_REVEAL_BUTTON_SELECTOR + "\"]"))
            .click();
    }

    public static void submitSearchQuery(String query, WebDriver driver) {
        driver.findElement(By.xpath("//*[@data-se=\"" + SEARCH_INPUT_SELECTOR + "\"]"))
            .sendKeys(query + Keys.ENTER);
    }

    public static List<WebElement> getSearchResults(WebDriver driver) {
        return driver.findElements(By.tagName("ddap-beacon-result"));
    }

}
