package com.dnastack.ddap.common;

import static java.lang.String.format;

import com.dnastack.ddap.common.page.ICLoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.net.URI;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public abstract class AbstractFrontendE2eTest extends AbstractBaseE2eTest {

    protected static final boolean HEADLESS = Boolean.parseBoolean(optionalEnv("HEADLESS", "true"));
    protected static final Pattern URL_PARSE_PATTERN = Pattern.compile("^(https?)://(.*)$");

    protected static WebDriver driver;
    protected static String screenshotDir;

    @Rule
    public ScreenShotRule screenShotRule() {
        return new ScreenShotRule(driver, screenshotDir);
    }

    @BeforeClass
    public static void driverSetup() {
        screenshotDir = optionalEnv("E2E_SCREENSHOT_DIR", "target");
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        if (HEADLESS) {
            options.addArguments("headless");
        }
        options.addArguments("--disable-gpu");
        options.addArguments("window-size=1200x600");
        options.addArguments("incognito");

        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }

    @AfterClass
    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }

    protected ICLoginPage startLogin(String realm) {
        driver.get(getUrlWithBasicCredentials(URI.create(DDAP_BASE_URL).resolve(format("/api/v1alpha/%s/identity/login", realm)).toString()));
        return new ICLoginPage(driver);
    }

    private String getUrlWithBasicCredentials(String original) {
        final Matcher matcher = URL_PARSE_PATTERN.matcher(original);
        if (matcher.find()) {
            return format("%s://%s:%s@%s", matcher.group(1), DDAP_USERNAME, DDAP_PASSWORD, matcher.group(2));
        } else {
            throw new IllegalArgumentException("Could not parse url: " + original);
        }
    }

}
