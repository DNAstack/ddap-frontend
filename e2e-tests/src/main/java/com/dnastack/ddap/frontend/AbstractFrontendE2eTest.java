package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.util.RetryRule;
import com.dnastack.ddap.common.util.ScreenshotUtil;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.rules.TestName;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.net.URI;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.String.format;

@Slf4j
public abstract class AbstractFrontendE2eTest extends AbstractBaseE2eTest {

    protected static final boolean HEADLESS = Boolean.parseBoolean(optionalEnv("HEADLESS", "true"));
    protected static final Pattern URL_PARSE_PATTERN = Pattern.compile("^(https?)://(.*)$");
    protected static WebDriver driver;
    protected static AnyDdapPage ddapPage;

    @Rule
    public TestName name = new TestName();
    @Rule
    public RetryRule retry = new RetryRule(Integer.parseInt(optionalEnv("E2E_TEST_RETRIES", "3")));

    @BeforeClass
    public static void driverSetup() {
        WebDriverManager.chromedriver().setup();
        driver = getChromeDriver();
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
    }

    private static ChromeDriver getChromeDriver() {
        ChromeOptions options = new ChromeOptions();
        if (HEADLESS) {
            options.addArguments("headless");
        }
        options.addArguments("--disable-gpu");
        options.addArguments("window-size=1200x600");
        options.addArguments("incognito");

        return new ChromeDriver(options);
    }

    @AfterClass
    public static void cleanUp() {
        if (driver == null) {
            return;
        }
        driver.manage().deleteAllCookies();
        driver.quit();
        driver = null;
    }

    @After
    public void afterEach() {
        String testName = this.getClass().getSimpleName() + "." + name.getMethodName() + ".png";
        ScreenshotUtil.capture(testName, driver);
    }

    protected static ICLoginPage startLogin(String realm) {
        driver.manage().deleteAllCookies();
        driver.get(getUrlWithBasicCredentials(URI.create(DDAP_BASE_URL).resolve(format("/api/v1alpha/%s/identity/login", realm)).toString()));
        return new ICLoginPage(driver);
    }

    private static String getUrlWithBasicCredentials(String original) {
        final Matcher matcher = URL_PARSE_PATTERN.matcher(original);
        if (matcher.find()) {
            return format("%s://%s:%s@%s", matcher.group(1), DDAP_USERNAME, DDAP_PASSWORD, matcher.group(2));
        } else {
            throw new IllegalArgumentException("Could not parse url: " + original);
        }
    }

}
