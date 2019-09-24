package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.fragments.ExpandedAccessibleViewItem;
import com.dnastack.ddap.common.fragments.ViewAccessMenu;
import com.dnastack.ddap.common.page.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class DataExploreE2eTest extends AbstractFrontendE2eTest {

    private static final String REALM = generateRealmName(DataExploreE2eTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        setupRealmConfig("administrator", damConfig, "1", REALM);

        ICLoginPage icLoginPage = startLogin(REALM);
        ddapPage = icLoginPage.loginAsPersona("dr_joe_elixir", AdminDdapPage::new);
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

    @Test
    public void testRequestAccessForBeaconDiscoveryExpectSuccess() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage
                .findDataByName("1000 Genomes")
                .clickViewButton();

        ExpandedAccessibleViewItem beaconDiscoveryView = thousandGenomesDetailPage.expandViewItem("Beacon Discovery Access");
        ViewAccessMenu beaconDiscoveryAccessMenu = beaconDiscoveryView.requestAccess();
        assertFalse(beaconDiscoveryAccessMenu.accessRequestFailed());
        beaconDiscoveryAccessMenu.closeMenu();
    }

    @Test
    public void testRequestAccessForFullFileReadAndBeaconDiscovery() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage
                .findDataByName("1000 Genomes")
                .clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        ViewAccessMenu fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());
        fullFileReadAccessMenu.closeMenu();

        ExpandedAccessibleViewItem beaconDiscoveryView = thousandGenomesDetailPage.expandViewItem("Beacon Discovery Access");
        ViewAccessMenu beaconDiscoveryAccessMenu = beaconDiscoveryView.requestAccess();
        assertFalse(beaconDiscoveryAccessMenu.accessRequestFailed());
        beaconDiscoveryAccessMenu.closeMenu();
    }

    @Test
    public void shouldFindWorkingDownloadLink() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage
                .findDataByName("1000 Genomes")
                .clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        String downloadHref = fullFileReadView.getDownloadLink();

        /*
         * Clicking a link that opens in a new tab is difficult to do, so instead let's just
         * check that the href works directly.
         */
        given()
                .log().method()
                .log().uri()
                .auth().preemptive().basic(basicUsername, basicPassword)
                .when()
                .get(downloadHref)
                .then()
                .log().ifValidationFails()
                .statusCode(200)
                .contentType("application/zip");
    }

}
