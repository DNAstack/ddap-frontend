package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.TestingPersona;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.URI;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.dnastack.ddap.common.TestingPersona.*;
import static java.lang.String.format;
import static org.openqa.selenium.support.ui.ExpectedConditions.or;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated;

@Slf4j
public class ICLoginPage {

    private WebDriver driver;

    public ICLoginPage(WebDriver driver) {
        this.driver = driver;
        log.info("Testing if {} is an IC login page", driver.getCurrentUrl());
        new WebDriverWait(driver, 5)
                .until(or(visibilityOfElementLocated(By.xpath("//a[contains(@href, '/login/persona')]")),
                          // If persona login is disabled, check that there is a wallet login
                          visibilityOfElementLocated(By.xpath("//a[contains(@href, '/login/wallet')]"))));
    }

    private By personaLoginButton(TestingPersona persona) {
        return By.xpath(format("//a[contains(@href, '%s')]", persona.getId()));
    }

    public <T extends AnyDdapPage> T loginAsPersona(TestingPersona persona, Function<WebDriver, T> pageConstructor) {
        driver.findElement(By.xpath("//a[contains(@href, '/login/persona')]")).click();
        new WebDriverWait(driver, 5)
                .until(visibilityOfElementLocated(personaLoginButton(persona)));
        driver.findElement(personaLoginButton(persona)).click();

        new WebDriverWait(driver, 5)
                .until(visibilityOfElementLocated(By.id("agree")));
        driver.findElement(By.id("agree")).click();
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
