package com.dnastack.ddap.common.page;

import com.dnastack.ddap.common.DdapBy;
import lombok.Value;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

import static java.lang.String.format;

public class NavBar {
    private WebDriver driver;

    @Value
    public static class NavLink {
        private String title;
        private By selector;
        private NavLink parentSelector;

        public Optional<NavLink> getParentSelector() {
            return Optional.ofNullable(parentSelector);
        }
        public Optional<String> getTitle() {
            return Optional.ofNullable(title);
        }
    }

    public static NavLink dataLink() {
        return new NavLink("Explore Data", DdapBy.se("nav-data"), null);
    }

    public static NavLink damIdentityLink() {
        return new NavLink("My Identity", DdapBy.se("nav-identity"), null);
    }

    public static NavLink icPanelSelectorLink() {
        return new NavLink("Identity Concentrator", DdapBy.se("nav-ic-panel"), null);
    }

    public static NavLink icIdentityProvidersLink() {
        return new NavLink("Identity Providers", DdapBy.se("nav-ic-identity-providers"), icPanelSelectorLink());
    }

    public static NavLink icClientsLink() {
        return new NavLink("Clients", DdapBy.se("nav-ic-clients"), icPanelSelectorLink());
    }

    public static NavLink icOptionsLink() {
        return new NavLink("Options", DdapBy.se("nav-ic-options"), icPanelSelectorLink());
    }

    public static NavLink damPanelSelectorLink(String damId) {
        return new NavLink(null,
                           By.xpath(format("//*[@data-se = 'nav-dam-panel-%s']", damId)),
                           icPanelSelectorLink());
    }

    public static NavLink damOptionsLink(String damId) {
        return new NavLink("Options", DdapBy.se("nav-options"), damPanelSelectorLink(damId));
    }

    public static NavLink damResourceLink(String damId) {
        return new NavLink("Resource", DdapBy.se("nav-resources"), damPanelSelectorLink(damId));
    }

    public static NavLink damTestPersonaLink(String damId) {
        return new NavLink("Test Personas", DdapBy.se("nav-test-personas"), damPanelSelectorLink(damId));
    }

    public static NavLink damClientLink(String damId) {
        return new NavLink("Client Applications", DdapBy.se("nav-client-applications"), damPanelSelectorLink(damId));
    }

    public static NavLink damTrustedSourcesLink(String damId) {
        return new NavLink("Trusted Sources", DdapBy.se("nav-trusted-sources"), damPanelSelectorLink(damId));
    }

    public static NavLink damClaimDefinitionLink(String damId) {
        return new NavLink("Claim Definitions", DdapBy.se("nav-claim-definitions"), damPanelSelectorLink(damId));
    }

    public static NavLink damServiceDefinitionLink(String damId) {
        return new NavLink("Service Definitions", DdapBy.se("nav-service-definitions"), damPanelSelectorLink(damId));
    }

    public static NavLink damPoliciesLink(String damId) {
        return new NavLink("Access Policies", DdapBy.se("nav-access-policies"), damPanelSelectorLink(damId));
    }

    public static NavLink damPassportsLink(String damId) {
        return new NavLink("Passport Issuers", DdapBy.se("nav-passport-issuers"), damPanelSelectorLink(damId));
    }

    public NavBar(WebDriver driver) {
        this.driver = driver;

        // We might not be on an admin page. Only assert basic navbar links
        assertNonAdminNavBar();
    }

    public void assertAdminNavBar() {
        Stream.of(icPanelSelectorLink().getSelector(), By.xpath(".//*[contains(@data-se, '" + "nav-dam-panel" + "')]"))
              .forEach(this.driver::findElement);
    }

    public void assertNonAdminNavBar() {
        Stream.of(dataLink(), damIdentityLink())
              .map(NavLink::getSelector)
              .forEach(this.driver::findElement);
    }

    public boolean existsInNavBar(NavLink item) {
        return driver.findElements(item.getSelector()).size() > 0;
    }

    public NavBar goTo(NavLink navItem) {
        return goTo(navItem, NavBar::new);
    }

    public <T> T goTo(NavLink navItem, Function<WebDriver, T> pageFactory) {
        final WebElement clickableNavLink = navItem.getParentSelector()
                                                   .map(parent -> {
                                                       final WebElement parentElement = driver.findElement(parent.getSelector());
                                                       parentElement.click();
                                                       WebElement linkElement = parentElement.findElement(navItem.getSelector());
                                                       new WebDriverWait(driver,
                                                                         5).until(ExpectedConditions.elementToBeClickable(
                                                               linkElement));

                                                       return linkElement;
                                                   })
                                                   .orElseGet(() -> driver.findElement(navItem.getSelector()));
        clickableNavLink.click();

        return pageFactory.apply(driver);
    }

    public DataListPage goToData() {
        driver.findElement(dataLink().getSelector()).click();

        return new DataListPage(driver);
    }

    public AdminListPage goToAdmin(NavLink navItem) {
        return goTo(navItem, AdminListPage::new);
    }

    public AdminOptionPage goToAdminOptionPage(NavLink navItem) {
        return goTo(navItem, AdminOptionPage::new);
    }

    private WebElement getRealmInput() {
        return driver.findElement(DdapBy.se("realm-input"));
    }

    public ConfirmationRealmChangeDialog setRealm(String targetRealm) {
        WebElement realmInput = getRealmInput();

        realmInput.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.BACK_SPACE);
        realmInput.sendKeys(targetRealm, Keys.RETURN);

        return new ConfirmationRealmChangeDialog(driver);
    }

    public String getRealm() {
        WebElement realmInput = getRealmInput();
        return realmInput.getAttribute("value");
    }

    public ICLoginPage logOut() {
        driver.findElement(DdapBy.se("nav-logout")).click();
        return new ICLoginPage(driver);
    }

}
