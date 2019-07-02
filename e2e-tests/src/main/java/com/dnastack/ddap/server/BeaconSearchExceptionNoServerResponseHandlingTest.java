package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.fasterxml.jackson.databind.DeserializationFeature;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import lombok.Data;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

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
        String realmConfigString = loadTemplate("/com/dnastack/ddap/beaconSearchExceptionNoServerResponseHandlingTest.json");
        setupRealmConfig("administrator", realmConfigString, REALM);
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
        BeaconQueryResult[] results = given()
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


        assertEquals(results.length, 2);

        final String errorMessage = "Name or service not known";
        for (BeaconQueryResult result : results) {
            assertThat(result.getError(), notNullValue());
            assertThat(result.getError().getStatus(), equalTo(500));
            assertThat(result.getError().getMessage(), containsString(errorMessage));
        }
    }

    @Data
    static class BeaconQueryResult {
        Boolean exists;
        BeaconError error;
    }

    @Data
    static class BeaconError {
        Integer status;
        String message;
    }

}