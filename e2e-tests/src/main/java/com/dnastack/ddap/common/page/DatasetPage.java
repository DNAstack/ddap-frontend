package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class DatasetPage extends AnyDdapPage {
    public DatasetPage(WebDriver driver) {
        super(driver);
        driver.findElement(By.tagName("ddap-dataset-import"));
    }

    public void fetchDatasetResult(String datasetUrl) {
        WebElement datasetInput = driver.findElement(DdapBy.se("dataset-url"));
        WebElement fetchButton = driver.findElement(DdapBy.se("btn-import-dataset"));
        datasetInput.clear();
        datasetInput.sendKeys(datasetUrl);
        fetchButton.click();
    }

    public List<WebElement> dataSetResult() {
        new WebDriverWait(getDriver(), 10)
                .until(ExpectedConditions.presenceOfElementLocated(By.tagName("ddap-dataset-results")));
        return driver.findElements(By.xpath("//mat-row"));
    }

    public List<WebElement> getAccessTokens(String columnName) {
        //  click dropdown and select bam_file column
        selectColumn(columnName);
        selectCheckboxes();
        WebElement getAccessButton = driver.findElement(DdapBy.se("btn-get-access"));
        getAccessButton.click();
        if(columnName != null) {
            new WebDriverWait(driver, 15)
                    .until(ExpectedConditions.numberOfElementsToBeMoreThan(DdapBy.se("access-token-info"), 0));
        } else {
            new WebDriverWait(driver, 15)
                    .until(ExpectedConditions.numberOfElementsToBe(DdapBy.se("access-token-info"), 0));
        }
        return driver.findElements(DdapBy.se("access-token-info"));
    }

    private void selectColumn(String columnName) {
        WebElement columnDropdown = driver.findElement(DdapBy.se("select-column"));
        columnDropdown.click();
        List<WebElement> options = driver.findElements(By.tagName("mat-option"));
        if(columnName != null) {
            WebElement option = new WebDriverWait(driver, 1)
                    .until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//mat-option/span[contains(text(), '" + columnName + "')]")));
            option.click();
        } else {
            options.get(0).click();
        }
    }

    private void selectCheckboxes() {
        List<WebElement> checkboxes = driver.findElements(By.tagName("mat-checkbox"));
        checkboxes.get(1).click();
        checkboxes.get(2).click();
    }
}
