package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.TestingPersona;
import com.dnastack.ddap.common.fragments.ExpandedAccessibleViewItem;
import com.dnastack.ddap.common.fragments.ViewAccessMenu;
import com.dnastack.ddap.common.page.AnyDdapPage;
import com.dnastack.ddap.common.page.DataDetailPage;
import com.dnastack.ddap.common.page.DataListPage;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static com.dnastack.ddap.common.TestingPersona.USER_WITHOUT_ACCESS;
import static org.junit.Assert.assertTrue;

@SuppressWarnings("Duplicates")
public class DataExploreNoAccessE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(DataExploreNoAccessE2eTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);

        ddapPage = doBrowserLogin(REALM, USER_WITHOUT_ACCESS, AnyDdapPage::new);
    }

    private String basicUsername;
    private String basicPassword;

    @Before
    public void setup() {
        basicUsername = requiredEnv("E2E_BASIC_USERNAME");
        basicPassword = requiredEnv("E2E_BASIC_PASSWORD");
    }

    @Test
    public void testRequestAccessForFullFileReadExpectPermissionDenied() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage
                .findDataByName("1000 Genomes")
                .clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        ViewAccessMenu fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());
        fullFileReadAccessMenu.closeMenu();
    }

    @Test
    public void testRequestAccessForFullFileReadMultipleTimesExpectPermissionDenied() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage
                .findDataByName("1000 Genomes")
                .clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        ViewAccessMenu fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());
        fullFileReadAccessMenu.closeMenu();

        fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());
        fullFileReadAccessMenu.closeMenu();

        fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());
        fullFileReadAccessMenu.closeMenu();
    }

}
