package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.*;


public class BeaconSearchApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchApiTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/aggregateSearchRealmConfig.json");
        setupRealmConfig("administrator", realmConfigString, REALM);
    }

    @Test
    public void shouldGetTwoResultsForAggregateSearch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .cookie("refresh_token", refreshToken)
                    .get("/api/v1alpha/" + REALM + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                    .then()
                .log().everything()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("beaconInfo.name", containsInAnyOrder("Beacon Discovery", "Beacon Discovery Access"))
                    .body("beaconInfo.viewId", containsInAnyOrder("beacon", "discovery-access"))
                    .body("beaconInfo.resourceId", containsInAnyOrder("ga4gh-apis", "thousand-genomes"))
                    .body("beaconInfo.resourceLabel", containsInAnyOrder("GA4GH APIs", "1000 Genomes"));
        // @formatter:on
    }

    @Test
    public void shouldGetOneResultForSingleResourceSearch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
        .when()
            .get(format(
                    "/api/v1alpha/%s/resources/thousand-genomes/search" +
                            "?referenceName=13" +
                            "&start=32936732" +
                            "&referenceBases=G" +
                            "&alternateBases=C" +
                            "&type=beacon" +
                            "&assemblyId=GRCh37",
                    REALM))
        .then()
            .log().everything()
            .contentType("application/json")
            .body("[0].beaconInfo.name", equalTo("Beacon Discovery Access"))
            .body("[0].beaconInfo.viewId", equalTo("discovery-access"))
            .body("[0].beaconInfo.resourceId", equalTo("thousand-genomes"))
            .body("[0].beaconInfo.resourceLabel", equalTo("1000 Genomes"))
            .body("[0].exists", anyOf(nullValue(), instanceOf(boolean.class)))
            .statusCode(200);
        // @formatter:on
    }

    @Test
    public void missingResourceUiLabel() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
        .when()
            .get(format(
                    "/api/v1alpha/%s/resources/thousand-genomes/search" +
                            "?referenceName=13" +
                            "&start=32936732" +
                            "&referenceBases=G" +
                            "&alternateBases=C" +
                            "&type=beacon" +
                            "&assemblyId=GRCh37",
                    REALM))
        .then()
            .log().everything()
            .contentType("application/json")
            .body("[0].beaconInfo.name", equalTo("Beacon Discovery Access"))
            .body("[0].beaconInfo.viewId", equalTo("discovery-access"))
            .body("[0].beaconInfo.resourceId", equalTo("thousand-genomes"))
            .body("[0].beaconInfo.resourceLabel", equalTo("1000 Genomes"))
            .body("[0].exists", anyOf(nullValue(), instanceOf(boolean.class)))
            .statusCode(200);
        // @formatter:on
    }

}