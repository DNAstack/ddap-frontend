package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.DatasetPage;
import com.dnastack.ddap.common.page.ICLoginPage;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static com.dnastack.ddap.common.page.NavBar.importDataLink;

public class ImportDataE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM= generateRealmName(ImportDataE2eTest.class.getSimpleName());

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
        String datasetUrl = "https://storage.googleapis.com/ddap-test-objects/dataset/subjects-with-objects";
        DatasetPage datasetPage = new DatasetPage(driver);
        datasetPage.fetchDatasetResult(datasetUrl);
    }

    @Test
    public void testGetAccessOfValidUrlColumns() {

    }

    @Test
    public void testGetAccessOfInvalidUrlColumns() {

    }


}
