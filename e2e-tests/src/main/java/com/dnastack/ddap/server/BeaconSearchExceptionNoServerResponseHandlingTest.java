package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.DamConfig;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import lombok.Data;
import org.junit.Before;
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
public class BeaconSearchExceptionNoServerResponseHandlingTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchExceptionNoServerResponseHandlingTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        final String baseRealmConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");

        final ObjectMapper objectMapper = new ObjectMapper();

        /*
         * Instead of having a mostly copy-pasted duplicate config file for this test,
         * let's just modify the config programmatically with the changes we need.
         */
        final DamConfig damConfig = objectMapper.readValue(baseRealmConfig, DamConfig.class);
        damConfig.getResources()
                 .get("thousand-genomes")
                 .getViews()
                 .get("discovery-access")
                 .getItems()
                 .get(0)
                 .getVars()
                 .put("url", "https://non-existent.totally-fake.dnastack.com");
        damConfig.getResources()
                 .get("ga4gh-apis")
                 .getViews()
                 .get("beacon")
                 .getItems()
                 .get(0)
                 .getVars()
                 .put("url", "https://other-non-existent.totally-fake.dnastack.com");

        final String realmConfig = objectMapper.writeValueAsString(damConfig);

        setupRealmConfig("administrator", realmConfig, "1", REALM);
        RestAssured.config = RestAssuredConfig.config()
                                              .objectMapperConfig(new ObjectMapperConfig().jackson2ObjectMapperFactory(
                                                      (cls, charset) -> new com.fasterxml.jackson.databind.ObjectMapper()
                                                              .findAndRegisterModules()
                                                              .configure(
                                                                      DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                                                                      false)));
    }

    @Test
    public void shouldGetNoBeaconServerFoundError() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

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
