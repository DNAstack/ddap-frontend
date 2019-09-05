package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.DatasetPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebElement;

import java.io.IOException;
import java.util.List;

import static com.dnastack.ddap.common.page.NavBar.importDataLink;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

public class ImportDataE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM= generateRealmName(ImportDataE2eTest.class.getSimpleName());
    private static String datasetUrl = optionalEnv("E2E_DATASET_URL", "https://storage.googleapis.com"
            + "/ddap-test-objects/dataset/subjects-with-objects");
    // TODO: DISCO-2408

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
    public void testFetchDatasetResult() {
        ddapPage.getNavBar().goTo(importDataLink());
        DatasetPage datasetPage = new DatasetPage(driver);
        datasetPage.fetchDatasetResult(datasetUrl);
        List<WebElement> datasetResults = datasetPage.dataSetResult();
        assertFalse(datasetResults.isEmpty());
    }

    @Test
    public void testGetAccessOfValidUrlColumns() {
        ddapPage.getNavBar().goTo(importDataLink());
        DatasetPage datasetPage = new DatasetPage(driver);
        datasetPage.fetchDatasetResult(datasetUrl);
        List<WebElement> accessTokenCards = datasetPage.getAccessTokens("bam_file");
        assertFalse(accessTokenCards.isEmpty());
    }

    @Test
    public void testGetAccessOfInvalidUrlColumns() {
        ddapPage.getNavBar().goTo(importDataLink());
        DatasetPage datasetPage = new DatasetPage(driver);
        datasetPage.fetchDatasetResult(datasetUrl);
        List<WebElement> accessTokenCards = datasetPage.getAccessTokens(null);
        assertTrue(accessTokenCards.isEmpty());
    }

}
