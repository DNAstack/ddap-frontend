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
import java.util.Arrays;
import java.util.Optional;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.util.Comparator.comparing;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

/**
 * 1. Test for 4xx error
 */
public class BeaconSearchUnauthorizedBeaconExceptionHandlingTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchUnauthorizedBeaconExceptionHandlingTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/beaconSearchUnauthorizedBeaconExceptionHandlingTest.json");
        setupRealmConfig("administrator", realmConfigString, "1", REALM);
        RestAssured.config = RestAssuredConfig.config()
                                              .objectMapperConfig(new ObjectMapperConfig().jackson2ObjectMapperFactory(
                                                      (cls, charset) -> new com.fasterxml.jackson.databind.ObjectMapper()
                                                              .findAndRegisterModules()
                                                              .configure(
                                                                      DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                                                                      false)));
    }

    @Test
    public void shouldGet403ErrorWhenUsingUnderscopedToken() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        /* Run the aggregate search query on the realm */
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
                    .extract()
                    .as(BeaconQueryResult[].class);
        // @formatter:on

        final BeaconQueryResult[] results = Arrays.stream(allResults)
                                                  .filter(bqr -> DAM_ID.equals(bqr.getBeaconInfo()
                                                                                  .getDamId()))
                                                  .sorted(comparing(result -> Optional.ofNullable(result)
                                                                                      .map(BeaconQueryResult::getBeaconInfo)
                                                                                      .map(BeaconInfo::getResourceId)
                                                                                      .orElseThrow(() -> { throw new AssertionError("Should not be a null result."); })))
                                                  .toArray(BeaconQueryResult[]::new);

        assertThat(results, arrayWithSize(2));
        assertThat(results[1].exists, nullValue());
        assertThat(results[1].beaconInfo, notNullValue());
        assertThat(results[1].beaconInfo.resourceId, equalTo("thousand-genomes"));
        assertThat(results[1].queryError, notNullValue());
        assertThat(results[1].queryError.status, equalTo(403));
        assertThat(results[1].queryError.message, notNullValue());
    }

    @Test
    public void shouldGet403WhenUserCannotGetViewToken() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("administrator", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("administrator", REALM);

        /* Run the aggregate search query on the realm */
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
                .extract()
                .as(BeaconQueryResult[].class);
        // @formatter:on

        final BeaconQueryResult[] results = Arrays.stream(allResults)
                                                  .filter(bqr -> DAM_ID.equals(bqr.getBeaconInfo()
                                                                                  .getDamId()))
                                                  .sorted(comparing(result -> Optional.ofNullable(result)
                                                                                      .map(BeaconQueryResult::getBeaconInfo)
                                                                                      .map(BeaconInfo::getResourceId)
                                                                                      .orElseThrow(() -> { throw new AssertionError("Should not be a null result."); })))
                                                  .toArray(BeaconQueryResult[]::new);

        assertThat(results, arrayWithSize(2));
        assertThat(results[1].exists, nullValue());
        assertThat(results[1].beaconInfo, notNullValue());
        assertThat(results[1].beaconInfo.resourceId, equalTo("thousand-genomes"));
        assertThat(results[1].queryError, notNullValue());
        assertThat(results[1].queryError.status, equalTo(403));
        assertThat(results[1].queryError.message,
                   allOf(containsString("Forbidden"),
                         containsString("thousand-genomes"),
                         containsString("discovery-access")));
    }

    @Test
    public void shouldGet401InBeaconResponsesWhenUnauthenticated() {
        /* Run the aggregate search query on the realm */
        // @formatter:off
        BeaconQueryResult[] allResults = given()
                .log().method()
                .log().uri()
                .when()
                .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                .get("/api/v1alpha/" + REALM + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                .then()
                .log().body()
                .contentType(JSON)
                .statusCode(200)
                .extract()
                .as(BeaconQueryResult[].class);
        // @formatter:on

        final BeaconQueryResult[] results = Arrays.stream(allResults)
                                                  .filter(bqr -> DAM_ID.equals(bqr.getBeaconInfo()
                                                                                  .getDamId()))
                                                  .sorted(comparing(result -> Optional.ofNullable(result)
                                                                                      .map(BeaconQueryResult::getBeaconInfo)
                                                                                      .map(BeaconInfo::getResourceId)
                                                                                      .orElseThrow(() -> { throw new AssertionError("Should not be a null result."); })))
                                                  .toArray(BeaconQueryResult[]::new);

        assertThat(results, arrayWithSize(2));
        assertThat(results[1].exists, nullValue());
        assertThat(results[1].beaconInfo, notNullValue());
        assertThat(results[1].beaconInfo.resourceId, equalTo("thousand-genomes"));
        assertThat(results[1].queryError, notNullValue());
        assertThat(results[1].queryError.status, equalTo(401));
        assertThat(results[1].queryError.message,
                   allOf(containsString("Unauthenticated"),
                         containsString("thousand-genomes"),
                         containsString("discovery-access")));
    }

    @Data
    static class BeaconQueryResult {
        BeaconInfo beaconInfo;
        Boolean exists;
        BeaconError queryError;
    }

    @Data
    static class BeaconInfo {
        String resourceId;
        String name;
        String damId;
    }

    @Data
    static class BeaconError {
        Integer status;
        String message;
    }

}
