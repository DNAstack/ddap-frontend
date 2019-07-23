package com.dnastack.ddap.common;

import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.extern.slf4j.Slf4j;
import org.junit.*;
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
    protected static String screenshotDir;
    protected AnyDdapPage ddapPage;

    @Rule
    public ScreenShotRule screenShotRule() {
        return new ScreenShotRule(driver, screenshotDir);
    }

    @BeforeClass
    public static void driverSetup() {
        screenshotDir = optionalEnv("E2E_SCREENSHOT_DIR", "target");
        WebDriverManager.chromedriver()
                .setup();
        ChromeOptions options = new ChromeOptions();
        if (HEADLESS) {
            options.addArguments("headless");
        }
        options.addArguments("--disable-gpu");
        options.addArguments("window-size=1200x600");
        options.addArguments("incognito");

        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
    }

    @AfterClass
    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }

    @After
    public void afterEach() {
        if (driver != null) {
            // FIXME: DISCO-2354 this is causing issue where basic auth prompt is displayed during tests, probably race condition
            // driver.manage().deleteAllCookies(); // Ensure that tests with login work independently of each other.
        }
    }

    @Before
    public void beforeEach() {
        ICLoginPage icLoginPage = startLogin(getRealm());
        ddapPage = login(icLoginPage);
    }

    protected abstract AnyDdapPage login(ICLoginPage icLoginPage);

    protected abstract String getRealm();

    protected static ICLoginPage startLogin(String realm) {
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
