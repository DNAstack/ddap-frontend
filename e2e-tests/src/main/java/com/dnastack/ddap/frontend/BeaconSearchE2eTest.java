package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.DdapBy;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.dnastack.ddap.common.page.NavBar.dataLink;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@SuppressWarnings("Duplicates")
public class BeaconSearchE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(BeaconSearchE2eTest.class.getSimpleName());

    @Override
    protected String getRealm() {
        return REALM;
    }

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig("administrator", testConfig, "1", REALM);
    }

    @Override
    protected AnyDdapPage login(ICLoginPage icLoginPage) {
        return icLoginPage.loginAsNciResearcher(AnyDdapPage::new);
    }

    @Test
    public void searchBeaconWithValidQuery() {
        ddapPage.getNavBar()
            .goTo(dataLink());

        String query = "1 : 156105028 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.submitSearchQuery(query);

        List<WebElement> results = searchPage.getSearchResults(2);

        assertTrue(findFirstElementByCssClass(results, "match-success").isPresent());
    }

    @Test
    public void searchBeaconWithInvalidQuery() {
        ddapPage.getNavBar()
            .goTo(dataLink());

        String query = "1 : 1 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.submitSearchQuery(query);

        List<WebElement> results = searchPage.getSearchResults(2);
        assertFalse(findFirstElementByCssClass(results, "match-success").isPresent());
        assertTrue(findFirstElementByCssClass(results, "match-failure").isPresent());
    }

    @Test
    public void backLinkFromDataList() {
        ddapPage.getNavBar()
                .goTo(dataLink());

        String query = "1 : 156105028 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.submitSearchQuery(query);

        searchPage.clickBack();

        driver.findElement(DdapBy.text("Explore Data","h2"));
    }

    @Test
    public void backLinkFromDataDetails() {
        ddapPage.getNavBar()
                .goTo(dataLink());

        DataListPage dataListPage = new DataListPage(driver);
        final DataListItem data = dataListPage.findDataByName("1000 Genomes");
        DataDetailPage dataDetailPage = data.clickViewButton();
        dataDetailPage.assertResourcePage("1000 Genomes");

        String query = "1 : 156105028 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.submitSearchQuery(query);

        searchPage.clickBack();

        driver.findElement(DdapBy.text("1000 Genomes","h2"));
    }

    @Test
    public void limitSearchFromDataDetails() {
        ddapPage.getNavBar()
                .goTo(dataLink());

        DataListPage dataListPage = new DataListPage(driver);
        final DataListItem data = dataListPage.findDataByName("1000 Genomes");
        DataDetailPage dataDetailPage = data.clickViewButton();
        dataDetailPage.assertResourcePage("1000 Genomes");

        String query = "1 : 156105028 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.clickLimitSearch();
        searchPage.submitSearchQuery(query);

        List<WebElement> results = searchPage.getSearchResults(1);

        assertTrue(findFirstElementByCssClass(results, "match-success").isPresent());
    }

    @Test
    public void limitSearchOnSearchPage() {
        ddapPage.getNavBar()
                .goTo(dataLink());

        DataListPage dataListPage = new DataListPage(driver);
        final DataListItem data = dataListPage.findDataByName("1000 Genomes");
        DataDetailPage dataDetailPage = data.clickViewButton();
        dataDetailPage.assertResourcePage("1000 Genomes");

        String query = "1 : 156105028 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.clickLimitSearch();
        searchPage.submitSearchQuery(query);

        List<WebElement> results = searchPage.getSearchResults(1);

        assertTrue(findFirstElementByCssClass(results, "match-success").isPresent());
    }

    @Test
    public void changeQueryOnSearchPageAndGoBack() {
        ddapPage.getNavBar()
                .goTo(dataLink());

        String query = "1 : 156105028 T > C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.submitSearchQuery(query);

        // Start with a valid search

        List<WebElement> results = searchPage.getSearchResults(2);

        assertTrue(findFirstElementByCssClass(results, "match-success").isPresent());

        // Continue with invalid search

        query = "1 : 1 T > C";
        searchPage.submitSearchQuery(query);

        results = searchPage.getSearchResults(2);
        assertFalse(findFirstElementByCssClass(results, "match-success").isPresent());
        assertTrue(findFirstElementByCssClass(results, "match-failure").isPresent());

        // Go back to data list page

        searchPage.clickBack();

        driver.findElement(DdapBy.text("Explore Data","h2"));
    }

    @Test
    public void testBRCA2SearchLink() {
        ddapPage.getNavBar()
                .goTo(dataLink());

        DataListPage dataListPage = new DataListPage(driver);
        final DataListItem data = dataListPage.findDataByName("GA4GH APIs");
        DataDetailPage dataDetailPage = data.clickViewButton();
        dataDetailPage.assertResourcePage("GA4GH APIs");

        String query = "C";
        SearchPage searchPage = new SearchPage(driver);
        searchPage.openSearchInput();
        searchPage.clickLimitSearch();
        searchPage.submitSearchQuery(query);

        List<WebElement> results = searchPage.getSearchResults(0);
        assertThat(results.size(), is(0));

        searchPage.clickBRCA2();

        results = searchPage.getSearchResults(2);
        assertTrue(findFirstElementByCssClass(results, "match-success").isPresent());
        assertFalse(findFirstElementByCssClass(results, "match-failure").isPresent());
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
