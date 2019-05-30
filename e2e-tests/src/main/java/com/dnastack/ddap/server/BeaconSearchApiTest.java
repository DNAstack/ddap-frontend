package com.dnastack.ddap.server;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.*;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import java.io.IOException;

import com.google.protobuf.util.JsonFormat;
import dam.v1.e2e.DamService;
import org.junit.Before;
import org.junit.Test;


public class BeaconSearchApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchApiTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/aggregateSearchRealmConfig.json");

        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(realmConfigString, damConfigBuilder);

        setupRealmConfig("administrator", realmConfigString, REALM);
    }

    @Test
    public void shouldGetTwoResultsForAggregateSearch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/v1alpha/" + REALM + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0].beaconInfo.name", equalTo("Beacon Discovery"))
                    .body("[0].beaconInfo.viewId", equalTo("beacon"))
                    .body("[0].beaconInfo.resourceId", equalTo("ga4gh-apis"))
                    .body("[0].beaconInfo.resourceLabel", equalTo("GA4GH APIs"))
                    .body("[1].beaconInfo.name", equalTo("Beacon Discovery Access"))
                    .body("[1].beaconInfo.viewId", equalTo("discovery-access"))
                    .body("[1].beaconInfo.resourceId", equalTo("thousand-genomes"))
                    .body("[1].beaconInfo.resourceLabel", equalTo("1000 Genomes"));
        // @formatter:on
    }

    @Test
    public void shouldGetOneResultForSingleResourceSearch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
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

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
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