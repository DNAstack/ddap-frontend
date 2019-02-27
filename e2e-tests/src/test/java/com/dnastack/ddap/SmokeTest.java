package com.dnastack.ddap;

import com.dnastack.ddap.page.HasNavBar;
import com.dnastack.ddap.page.ICLoginPage;
import com.dnastack.ddap.page.NavBar;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.lang.String.format;
import static org.junit.Assert.fail;

public class SmokeTest {
    private static WebDriver driver;
    private static String screenshotDir;

    private final static String DDAP_USERNAME = requiredEnv("E2E_BASIC_USERNAME");
    private final static String DDAP_PASSWORD = requiredEnv("E2E_BASIC_PASSWORD");
    private final static String DDAP_BASE_URL = requiredEnv("E2E_BASE_URI");
    private final static boolean HEADLESS = Boolean.parseBoolean(optionalEnv("HEADLESS", "true"));
    private final static Pattern URL_PARSE_PATTERN = Pattern.compile("^(https?)://(.*)$");
    private final static String NAV_ITEM_FORMAT = "//mat-panel-title[contains(text(), '%s')]";

    private HasNavBar ddapPage;
    private final static Map<NavBar.NavItem, List<String>> DEFAULT_PAGE_ITEMS = new HashMap() {{
        put(NavBar.NavItem.RESOURCES,
                Arrays.asList("allOfUs", "ga4gh-apis"));
        put(NavBar.NavItem.IDENTITIES,
                Arrays.asList("nci_researcher", "john"));
        put(NavBar.NavItem.CLIENTS,
                Arrays.asList("craig_test", "dnastack_fe", "test_client", "test_page"));
        put(NavBar.NavItem.CLAIMS,
                Arrays.asList("elixir", "nci", "ustanford"));
        put(NavBar.NavItem.DEFINITIONS,
                Arrays.asList("ga4gh.AcceptedTermsAndPolicies", "ga4gh.ControlledAccessGrants"));
        put(NavBar.NavItem.GRANTS,
                Arrays.asList("bq_read", "gcs_read"));
        put(NavBar.NavItem.RULES,
                Arrays.asList("GRU", "bona_fide", "ethics"));
        put(NavBar.NavItem.PASSPORTS,
                Arrays.asList("dbGaP", "elixir", "playgroundIC"));
    }};

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

    @Before
    public void testSetup() {
        if (driver != null) {
            // Ensure that tests with login work independently of eachother.
            driver.manage().deleteAllCookies();
        }
        ICLoginPage icLoginPage = startLogin();
        ddapPage = icLoginPage.loginAsNciResearcher();
    }

    @AfterClass
    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }

    @Rule
    public ScreenShotRule screenShotRule() {
        return new ScreenShotRule(driver, screenshotDir);
    }

    @Test
    public void getDefaultResources() {
        NavBar.NavItem pageId = NavBar.NavItem.RESOURCES;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultIdentities() {
        NavBar.NavItem pageId = NavBar.NavItem.IDENTITIES;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultClients() {
        NavBar.NavItem pageId = NavBar.NavItem.CLIENTS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultClaims() {
        NavBar.NavItem pageId = NavBar.NavItem.CLAIMS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultDefinitions() {
        NavBar.NavItem pageId = NavBar.NavItem.DEFINITIONS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultGrants() {
        NavBar.NavItem pageId = NavBar.NavItem.GRANTS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultRules() {
        NavBar.NavItem pageId = NavBar.NavItem.RULES;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultPassports() {
        NavBar.NavItem pageId = NavBar.NavItem.PASSPORTS;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .stream()
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    private ICLoginPage startLogin() {
        driver.get(getUrlWithBasicCredentials(URI.create(DDAP_BASE_URL).resolve("/api/identity/login").toString()));
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

    private static String optionalEnv(String name, String defaultValue) {
        System.out.println(name + " " + defaultValue);
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }

    private static String requiredEnv(String name) {
        String val = System.getenv(name);
        System.out.println(name + " " + val);
        if (val == null) {
            fail("Environment variable `" + name + "` is required");
        }
        return val;
    }
}
