package com.dnastack.ddap.frontend;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.ExploreDataPage;
import com.dnastack.ddap.common.page.NavBar.NavItem;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

@SuppressWarnings("Duplicates")
public class BeaconSearchE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/aggregateSearchRealmConfig.json");
        setupRealmConfig("nci_researcher", testConfig, REALM);
    }

    @Test
    public void searchBeaconWithValidQuery() throws InterruptedException {
        ddapPage.getNavBar()
            .goTo(NavItem.DATA);

        String query = "1 : 156105028 T > C";
        ExploreDataPage.openSearchInput(driver);
        ExploreDataPage.submitSearchQuery(query, driver);

        Thread.sleep(6_000);

        List<WebElement> results = ExploreDataPage.getSearchResults(driver);
        assertThat(results.size(), greaterThanOrEqualTo(2));

        assertTrue(findFirstElementByCssClass(results, "indicator-green").isPresent());
        assertTrue(findFirstElementByCssClass(results, "metadata-key").isPresent());
        assertTrue(findFirstElementByCssClass(results, "metadata-value").isPresent());
    }

    @Test
    public void searchBeaconWithInvalidQuery() throws InterruptedException {
        ddapPage.getNavBar()
            .goTo(NavItem.DATA);

        String query = "1 : 1 T > C";
        ExploreDataPage.openSearchInput(driver);
        ExploreDataPage.submitSearchQuery(query, driver);

        Thread.sleep(6_000);

        List<WebElement> results = ExploreDataPage.getSearchResults(driver);
        assertThat(results.size(), greaterThanOrEqualTo(2));
        assertFalse(findFirstElementByCssClass(results, "indicator-green").isPresent());
        assertTrue(findFirstElementByCssClass(results, "indicator-red").isPresent());
    }

    private Optional<WebElement> findFirstElementByCssClass(List<WebElement> results, String cssClass) {
        for (WebElement result : results) {
            try {
                return Optional.of(result.findElement(By.className(cssClass)));
            } catch (NoSuchElementException nsee) {
                // Deliberately empty
            }
        }

        return Optional.empty();
    }

}
