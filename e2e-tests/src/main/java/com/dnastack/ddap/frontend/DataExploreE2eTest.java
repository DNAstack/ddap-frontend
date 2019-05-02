package com.dnastack.ddap.frontend;

import com.dnastack.ddap.common.AbstractFrontendE2eTest;
import com.dnastack.ddap.common.page.*;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class DataExploreE2eTest extends AbstractFrontendE2eTest {

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String testConfig = loadTemplate("/com/dnastack/ddap/adminTestPersonaConfig.json");
        setupRealmConfig("nci_researcher", testConfig, REALM);
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
        fullFileReadView.requestAccess();
        assertTrue(fullFileReadView.accessRequestFailed());
    }

    @Test
    public void testRequestAccessForFullFileReadMultipleTimesExpectPermissionDenied() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        fullFileReadView.requestAccess();
        assertTrue(fullFileReadView.accessRequestFailed());
        fullFileReadView.closeMenu();

        fullFileReadView.requestAccess();
        assertTrue(fullFileReadView.accessRequestFailed());
        fullFileReadView.closeMenu();

        fullFileReadView.requestAccess();
        assertTrue(fullFileReadView.accessRequestFailed());
        fullFileReadView.closeMenu();
    }

    @Test
    public void testRequestAccessForBeaconDiscoveryExpectSuccess() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

        ExpandedAccessibleViewItem beaconDiscoveryView = thousandGenomesDetailPage.expandViewItem("Beacon Discovery Access");
        beaconDiscoveryView.requestAccess();
        assertFalse(beaconDiscoveryView.accessRequestFailed());
    }

    @Test
    public void testRequestAccessForFullFileReadAndBeaconDiscovery() {
        DataListPage dataListPage = ddapPage.getNavBar().goToData();
        DataDetailPage thousandGenomesDetailPage = dataListPage.findDataByName("1000 Genomes").clickViewButton();

        ExpandedAccessibleViewItem fullFileReadView = thousandGenomesDetailPage.expandViewItem("Full File Read Access");
        fullFileReadView.requestAccess();
        assertTrue(fullFileReadView.accessRequestFailed());

        fullFileReadView.closeMenu();

        ExpandedAccessibleViewItem beaconDiscoveryView = thousandGenomesDetailPage.expandViewItem("Beacon Discovery Access");
        beaconDiscoveryView.requestAccess();
        assertFalse(beaconDiscoveryView.accessRequestFailed());
    }

}
