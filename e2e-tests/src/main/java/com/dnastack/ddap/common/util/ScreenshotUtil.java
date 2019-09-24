package com.dnastack.ddap.common.util;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;

import static com.dnastack.ddap.common.AbstractBaseE2eTest.optionalEnv;

public class ScreenshotUtil {

    protected static final String SCREENSHOT_DIR = optionalEnv("E2E_SCREENSHOT_DIR", "target");

    public static void capture(String filename, WebDriver driver) {
        try {
            File destiny = new File(SCREENSHOT_DIR, filename);
            FileUtils.copyFile(((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE), destiny);
        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }

}