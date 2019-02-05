package com.dnastack.ddap;

import com.dnastack.ddap.page.HasNavBar;
import com.dnastack.ddap.page.ICLoginPage;
import com.dnastack.ddap.page.NavBar;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import static java.lang.String.format;
import static org.junit.Assert.fail;

public class SmokeTest {
    private static WebDriver driver;
    private static String ddapUsername;
    private static String ddapPassword;
    private static String ddapBaseUrl;
    private final static Pattern URL_PARSE_PATTERN = Pattern.compile("^(https?)://(.*)$");
    private final static String NAV_ITEM_FORMAT = "//mat-panel-title[contains(text(), '%s')]";

    private HasNavBar ddapPage;
    private final static Map<NavBar.NavItem, Stream<String>> DEFAULT_PAGE_ITEMS = new HashMap() {{
        put(NavBar.NavItem.Resources,
                Stream.of("bar", "ga4gh-apis"));
        put(NavBar.NavItem.Identities,
                Stream.of("dr_joe", "nci_researcher", "john"));
        put(NavBar.NavItem.Clients,
                Stream.of("craig_test", "dnastack_fe", "test_client", "test_page"));
        put(NavBar.NavItem.Claims,
                Stream.of("elixir", "ncbi", "ustanford"));
        put(NavBar.NavItem.Definitions,
                Stream.of("ga4gh.AcademicInstitutionAffiliations", "ga4gh.ControlledDatasetsAccess"));
        put(NavBar.NavItem.Grants,
                Stream.of("bq_read", "gcs_read"));
        put(NavBar.NavItem.Rules,
                Stream.of("GRU", "bona_fide", "ethics"));
        put(NavBar.NavItem.Passports,
                Stream.of("NIH", "elixir"));
    }};

    @Before
    public void setUp() {
        ddapBaseUrl = requiredEnv("E2E_BASE_URI");
        ddapUsername = requiredEnv("E2E_BASIC_USERNAME");
        ddapPassword = requiredEnv("E2E_BASIC_PASSWORD");
        final boolean headless = Boolean.parseBoolean(optionalEnv("HEADLESS", "true"));

        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        if (headless) {
            options.addArguments("headless");
        }
        options.addArguments("--disable-gpu");
        options.addArguments("window-size=1200x600");
        options.addArguments("incognito");

        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        ICLoginPage icLoginPage = startLogin();
        ddapPage = icLoginPage.loginAsNciResearcher();
    }

    @AfterClass
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    public void getDefaultResources() {
        NavBar.NavItem pageId = NavBar.NavItem.Resources;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultIdentities() {
        NavBar.NavItem pageId = NavBar.NavItem.Identities;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultClients() {
        NavBar.NavItem pageId = NavBar.NavItem.Clients;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultClaims() {
        NavBar.NavItem pageId = NavBar.NavItem.Claims;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultDefinitions() {
        NavBar.NavItem pageId = NavBar.NavItem.Definitions;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultGrants() {
        NavBar.NavItem pageId = NavBar.NavItem.Grants;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultRules() {
        NavBar.NavItem pageId = NavBar.NavItem.Rules;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    @Test
    public void getDefaultPassports() {
        NavBar.NavItem pageId = NavBar.NavItem.Passports;
        ddapPage.getNavBar()
                .goTo(pageId);
        DEFAULT_PAGE_ITEMS.get(pageId)
                .forEach(item -> driver.findElement(By.xpath(format(NAV_ITEM_FORMAT, item))));
    }

    private ICLoginPage startLogin() {
        driver.get(getUrlWithBasicCredentials(ddapBaseUrl + "/api/identity/login"));
        return new ICLoginPage(driver);
    }

    private String getUrlWithBasicCredentials(String original) {
        final Matcher matcher = URL_PARSE_PATTERN.matcher(original);
        if (matcher.find()) {
            return format("%s://%s:%s@%s", matcher.group(1), ddapUsername, ddapPassword, matcher.group(2));
        } else {
            throw new IllegalArgumentException("Could not parse url: " + original);
        }
    }

    private static String optionalEnv(String name, String defaultValue) {
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }

    private static String requiredEnv(String name) {
        String val = System.getenv(name);
        if (val == null) {
            fail("Environment variable `" + name + "` is required");
        }
        return val;
    }
}
