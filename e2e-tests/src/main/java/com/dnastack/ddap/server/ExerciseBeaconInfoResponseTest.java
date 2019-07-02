package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import dam.v1.DamService;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.Matchers.containsInAnyOrder;


public class ExerciseBeaconInfoResponseTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(ExerciseBeaconInfoResponseTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/aggregateSearchRealmFakeBeaconInfoConfig.json");

        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(realmConfigString, damConfigBuilder);

        setupRealmConfig("administrator", realmConfigString, REALM);
    }

    /**
     * Test to exercise what happens to Beacon Org and name we get no response for beacon metadata (BeaconInfo)
     * @throws IOException
     */
    @Test
    public void exerciseMissingBeaconInfo() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

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
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                .body("beaconInfo.name", containsInAnyOrder("beacon", "beacon", "Beacon Discovery Access"))
                .body("beaconInfo.resourceLabel", containsInAnyOrder("fake-ga4gh", "ga4gh-apis", "1000 Genomes"));
        // @formatter:on
    }

}