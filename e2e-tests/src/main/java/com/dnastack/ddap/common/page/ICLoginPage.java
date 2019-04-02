package com.dnastack.ddap.common.page;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.net.URI;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class ICLoginPage implements HasNavBar {

    @Getter
    private WebDriver driver;

    private final By loginButton = By.xpath("//a[contains(@href, 'nci_researcher')]");

    public ICLoginPage(WebDriver driver) {
        this.driver = driver;
        log.info("Testing if {} is an IC login page", driver.getCurrentUrl());
        driver.findElement(loginButton);
    }

    public <T extends HasNavBar> T loginAsNciResearcher(Function<WebDriver, T> pageConstructor) {
        driver.findElement(loginButton).click();
        return pageConstructor.apply(driver);
    }

    public String getRealm() {
        // FIXME when the realm name appears in the UI, we can get it from the UI element
        // (at the time of this writing, the current realm name isn't mentioned in visible UI)
        URI currentUrl = URI.create(driver.getCurrentUrl());
        Pattern realmExtractor = Pattern.compile("/identity/v1alpha/([A-Za-z0-9_-]{3,40})/authorize");
        Matcher matcher = realmExtractor.matcher(currentUrl.getPath());
        if (matcher.matches()) {
            return matcher.group(1);
        } else {
            throw new AssertionError("IC Login page path '" + currentUrl.getPath() + "' does not conform to expected format");
        }
    }
}
