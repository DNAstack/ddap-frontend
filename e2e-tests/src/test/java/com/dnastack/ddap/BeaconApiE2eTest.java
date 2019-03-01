package com.dnastack.ddap;

import com.dnastack.ddap.page.HasNavBar;
import com.dnastack.ddap.page.ICLoginPage;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.response.ValidatableResponse;
import lombok.Getter;
import okhttp3.OkHttpClient;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.fail;


/**
 * 1. Create a beacon resource by doing post/put to DAM via a DDAP endpoint (DDAP bff).
 * 2. Query the above created resource using: "/api/resources/{resourceId}/search", params = "type=beacon
 * 3. Delete the resource in #1. DELETE to DDAP BFF: GET/POST/PUT/PATCH/DELETE /dam/v1/config/resources/resourceName
 */
public class BeaconApiE2eTest {

    //@Getter
    private static WebDriver driver;
    private static String ddapUsername;
    private static String ddapPassword;
    private static String ddapApiVersion;
    private static String ddapBaseUrl;
    private static Pattern urlParsePattern = Pattern.compile("^(https?)://(.*)$");


    private static OkHttpClient client;

    @BeforeClass
    public static void setUp() {
        RestAssured.baseURI = requiredEnv("E2E_BASE_URI");
        ddapApiVersion = requiredEnv("E2E_DDAP_API_VERSION");
        ddapBaseUrl = requiredEnv("E2E_DDAP_BASE_URL");
        ddapUsername = requiredEnv("E2E_DDAP_USERNAME");
        ddapPassword = requiredEnv("E2E_DDAP_PASSWORD");

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

        client = new OkHttpClient();
    }

    private ICLoginPage startLogin() {
        driver.get(getUrlWithBasicCredentials(ddapBaseUrl + "/api/identity/login"));
        return new ICLoginPage(driver);
    }

    private String getUrlWithBasicCredentials(String original) {
        final Matcher matcher = urlParsePattern.matcher(original);
        if (matcher.find()) {
            return format("%s://%s:%s@%s", matcher.group(1), ddapUsername, ddapPassword, matcher.group(2));
        } else {
            throw new IllegalArgumentException("Could not parse url: " + original);
        }
    }

    @Test
    public void beaconApiTest() throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File("/Users/harshd/WebstormProjects/ddap-frontend/e2e-tests/src/test/resources/resource.json");
        Map<String, Object> resources = objectMapper.readValue(file, Map.class);

        final ICLoginPage icLoginPage = startLogin();
        final HasNavBar someDdapPage = icLoginPage.loginAsNciResearcher();
        Cookie userTokenCookie = driver.manage().getCookieNamed("dam_token");

        String resourceName="harshtestresource9";

//        given()
//            .log().method()
//            .log().uri()
//            .auth().basic("dev", "dev")
//            .body(resources)
//        .when()
//            .post("dam/v1alpha/config/resources/" + resourceName + "?persona=nci_researcher")
//        .then()
//            .log().ifValidationFails()
//            .statusCode(200);

        String resourceId = resourceName;
        resourceId = "ga4gh-apis";
        ValidatableResponse validatableResponse = given()
                .log().method()
                .log().uri()
                .when()
                .auth().basic("dev", "dev")
                .cookie(userTokenCookie.getName(), userTokenCookie.getValue())
                .get("/api/resources/" + resourceId + "/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                .then()
                .log().ifValidationFails();
                validatableResponse.contentType(JSON)
                    .statusCode(200)
                    .body("build.name", equalTo("ddap-frontend"))
                    .body("build.version", notNullValue());

//        given()
//                .log().method()
//                .log().uri()
//                .auth().basic("dev", "dev")
//                .when()
//                .delete("dam/v1alpha/config/resources/" + resourceName + "?persona=nci_researcher")
//                .then()
//                .log().ifValidationFails()
//                .statusCode(200)
//                .body("build.name", equalTo("ddap-frontend"))
//                .body("build.version", notNullValue());
    }

    private static String requiredEnv(String name) {
        String val = System.getenv(name);
        if (val == null) {
            fail("Environnment variable `" + name + "` is required");
        }
        return val;
    }

    private static String optionalEnv(String name, String defaultValue) {
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }

    @AfterClass
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}