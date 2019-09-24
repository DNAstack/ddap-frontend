package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.util.DdapBy;
import org.apache.commons.lang3.StringUtils;
import org.hamcrest.Matcher;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.stream.Collectors;

import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.isEmptyOrNullString;

public class AdminOptionPage extends AdminDdapPage {

    public AdminOptionPage(WebDriver driver) {
        super(driver);
    }

    public AdminOptionPage submitOption(String optionName, String optionValue) {
        driver.findElement(getLine(optionName))
                .click();

        // need to wait for text field to become visible.
        final WebElement input = driver.findElement(getInput(optionName));
        new WebDriverWait(driver, 5).until(d -> input.isDisplayed());

        input.sendKeys(optionValue);
        final WebElement updateButton = driver.findElement(getUpdateButton(optionName));
        updateButton.click();

        return this;
    }

    public String getOptionValue(String optionName) {
        return driver.findElement(getValue(optionName)).getText();
    }

    public List<String> getOptionNames() {
        new WebDriverWait(driver, 5).until(d -> driver.findElement(DdapBy.se("option-name")).isDisplayed());

        return driver.findElements(DdapBy.se("option-name")).stream()
                     .map(WebElement::getText)
                     .collect(Collectors.toList());
    }

    private By getError(String optionName) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s')]]//*[@data-se='option-error']",
                               optionName
        ));
    }

    private By getValue(String optionName) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s')]]//*[@data-se='option-value']",
                               optionName
        ));
    }

    private By getLine(String optionName) {
        return By.xpath(format("//mat-expansion-panel[descendant::*[contains(text(), '%s') and @data-se='option-name']]",
                               optionName
        ));
    }

    private By getInput(String optionName) {
        return By.xpath(format(
                "//mat-expansion-panel[descendant::*[contains(text(), '%s') and @data-se='option-name']]//input[@data-se='option-input']",
                optionName
        ));
    }

    private By getUpdateButton(String optionName) {
        return By.xpath(format(
                "//mat-expansion-panel[descendant::*[contains(text(), '%s') and @data-se='option-name']]//button[descendant::*[contains(text(), 'Update Value')]]",
                optionName
        ));
    }

    public void assertNoError(String optionName, int timeoutInSeconds) {
        try {
            final String errorMsg = new WebDriverWait(driver, timeoutInSeconds).until(d -> {
                final List<WebElement> errorElements = d.findElements(getError(optionName));

                return errorElements.stream()
                                    .filter(e -> e.isDisplayed() && !StringUtils.isEmpty(e.getText()))
                                    .map(WebElement::getText)
                                    .findFirst()
                                    .orElse(null);
            });

            assertThat(String.format("Should not have error but this error observed: %s", errorMsg),
                       errorMsg,
                       isEmptyOrNullString());
        } catch (TimeoutException e) {
            // This means there was no error.
        }
    }

    public void assertError(String optionName, int timeoutInSeconds, Matcher<String> matcher) {
        try {
            final String errorMsg = new WebDriverWait(driver, timeoutInSeconds).until(d -> {
                final List<WebElement> errorElements = d.findElements(getError(optionName));

                return errorElements.stream()
                                    .filter(e -> e.isDisplayed() && !StringUtils.isEmpty(e.getText()))
                                    .map(WebElement::getText)
                                    .findFirst()
                                    .orElse(null);
            });

            assertThat(String.format("Should not have error but this error observed: %s", errorMsg),
                       errorMsg,
                       matcher);
        } catch (TimeoutException e) {
            // This means there was no error.
            throw new AssertionError("Expected error but none observed.", e);
        }
    }
}
