package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class DataExploreE2eTest extends AbstractFrontendE2eTest {
    private static final String REALM = generateRealmName(DataExploreE2eTest.class.getSimpleName());

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
    public void testRequestAccessForFullFileReadExpectPermissionDenied() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        ViewAccessMenu fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());
    }

    @Test
    public void testRequestAccessForFullFileReadMultipleTimesExpectPermissionDenied() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

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
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

        ExpandedAccessibleViewItem beaconDiscoveryView = thousandGenomesDetailPage.expandViewItem("Beacon Discovery Access");
        ViewAccessMenu beaconDiscoveryAccessMenu = beaconDiscoveryView.requestAccess();
        assertFalse(beaconDiscoveryAccessMenu.accessRequestFailed());
    }

    @Test
    public void testRequestAccessForFullFileReadAndBeaconDiscovery() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        ViewAccessMenu fullFileReadAccessMenu = fullFileReadView.requestAccess();
        assertTrue(fullFileReadAccessMenu.accessRequestFailed());

        fullFileReadAccessMenu.closeMenu();

        ExpandedAccessibleViewItem beaconDiscoveryView = thousandGenomesDetailPage.expandViewItem("Beacon Discovery Access");
        ViewAccessMenu beaconDiscoveryAccessMenu = beaconDiscoveryView.requestAccess();
        assertFalse(beaconDiscoveryAccessMenu.accessRequestFailed());
    }

}
