package com.dnastack.ddap.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DatasetPage extends AnyDdapPage {
    public DatasetPage(WebDriver driver) {
        super(driver);
        driver.findElement(By.xpath("//ddap-dataset-import"));
    }

    public void fetchDatasetResult(String datasetUrl) {
        WebElement datasetInput = getDriver().findElement(By.xpath("//*[@data-se=\"dataset-url\"]"));
        WebElement fetchButton = getDriver().findElement(By.xpath("//*[@data-se=\"btn-import-dataset\"]"));
        datasetInput.clear();
        datasetInput.sendKeys(datasetUrl);
        fetchButton.click();
    }

//    TODO: method to assert dataset result
//    public void dataSetResult() {
//        new WebDriverWait(getDriver(), 10)
//                .until(ExpectedConditions.presenceOfElementLocated());
//    }
}
