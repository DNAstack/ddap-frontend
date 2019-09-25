package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

/**
 * 1. Test for when no server found or no response from a beacon error
 */
@Slf4j
public class BeaconSearchExceptionNoServerResponseHandlingTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchExceptionNoServerResponseHandlingTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        setupRealmConfig(TestingPersona.ADMINISTRATOR, getModifiedRealmJson(), "1", REALM);
    }

    private static String getModifiedRealmJson() {
        final String baseRealmConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        /*
         * Instead of having a mostly copy-pasted duplicate config file for this test,
         * let's just modify the config programmatically with the changes we need.
         */
        JSONObject realmConfigJson = new JSONObject(baseRealmConfig);
        realmConfigJson.getJSONObject("resources")
                .getJSONObject("thousand-genomes")
                .getJSONObject("views")
                .getJSONObject("discovery-access")
                .getJSONArray("items")
                .getJSONObject(0)
                .getJSONObject("vars")
                .put("url", "https://non-existent.totally-fake.dnastack.com");
        realmConfigJson.getJSONObject("resources")
                .getJSONObject("ga4gh-apis")
                .getJSONObject("views")
                .getJSONObject("beacon")
                .getJSONArray("items")
                .getJSONObject(0)
                .getJSONObject("vars")
                .put("url", "https://other-non-existent.totally-fake.dnastack.com");
        return realmConfigJson.toString();
    }

    @Test
    public void shouldGetNoBeaconServerFoundError() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.NCI_RESEARCHER, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.NCI_RESEARCHER, REALM);

        // @formatter:off
        BeaconQueryResult[] allResults = given()
                    .log().method()
                    .log().uri()
                .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .cookie("refresh_token", refreshToken)
                    .get("/api/v1alpha/" + REALM + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                .then()
                    .log().body()
                    .contentType(JSON)
                    .statusCode(200)
                    .extract().as(BeaconQueryResult[].class);
        // @formatter:on


        final BeaconQueryResult[] results = Arrays.stream(allResults)
                                                  .filter(bqr -> DAM_ID.equals(bqr.getBeaconInfo()
                                                                                  .getDamId()))
                                                  .toArray(BeaconQueryResult[]::new);
        assertEquals(results.length, 2);

        final String errorMessage = "Name or service not known";
        for (BeaconQueryResult result : results) {
            assertThat(result.getQueryError(), notNullValue());
            assertThat(result.getQueryError().getStatus(), equalTo(500));
            assertThat(result.getQueryError().getMessage(), containsString(errorMessage));
        }
    }

    @Data
    static class BeaconQueryResult {
        Boolean exists;
        BeaconQueryError queryError;
        BeaconInfo beaconInfo;
    }

    @Data
    static class BeaconInfo {
        private String damId;
    }

    @Data
    static class BeaconQueryError {
        Integer status;
        String message;
    }

}
