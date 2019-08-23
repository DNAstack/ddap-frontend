package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.fasterxml.jackson.databind.DeserializationFeature;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.response.Response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.*;


public class BeaconSearchApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchApiTest.class.getSimpleName());

    @Data
    public static class BeaconResponse {
        private BeaconInfo beaconInfo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BeaconInfo {
        private String name;
        private String viewId;
        private String resourceId;
        private String resourceLabel;
        private String damId;
    }

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/adminConfig.json");
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
    public void shouldGetTwoResultsForAggregateSearch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        final Response response = given()
                .log().method()
                .log().uri()
                .when()
                .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
                .get("/api/v1alpha/" + REALM + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C");
        response
                .then()
                .log().everything()
                .contentType(JSON)
                .statusCode(200);
        // @formatter:on
        final BeaconResponse[] responses = response.as(BeaconResponse[].class);
        final Set<BeaconInfo> beaconInfoFromTestedDam = Arrays.stream(responses)
                                                              .map(BeaconResponse::getBeaconInfo)
                                                              .filter(info -> DAM_ID.equals(info.getDamId()))
                                                              .collect(Collectors.toSet());

        Assert.assertThat(beaconInfoFromTestedDam,
                          containsInAnyOrder(equalTo(new BeaconInfo("Beacon Discovery",
                                                                    "beacon",
                                                                    "ga4gh-apis",
                                                                    "GA4GH APIs",
                                                                    DAM_ID)),
                                            equalTo(new BeaconInfo("Beacon Discovery Access",
                                                                    "discovery-access",
                                                                    "thousand-genomes",
                                                                    "1000 Genomes (non-prod)",
                                                                    DAM_ID))));
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
                    // FIXME make DAM ID environment variable
                    "/api/v1alpha/%s/resources/1/thousand-genomes/search" +
                            "?referenceName=13" +
                            "&start=32936732" +
                            "&referenceBases=G" +
                            "&alternateBases=C" +
                            "&type=beacon" +
                            "&assemblyId=GRCh37",
                    REALM))
        .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("[0].beaconInfo.name", equalTo("Beacon Discovery Access"))
            .body("[0].beaconInfo.viewId", equalTo("discovery-access"))
            .body("[0].beaconInfo.resourceId", equalTo("thousand-genomes"))
            .body("[0].beaconInfo.resourceLabel", equalTo("1000 Genomes (non-prod)"))
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
                    // FIXME make DAM ID environment variable
                    "/api/v1alpha/%s/resources/1/thousand-genomes/search" +
                            "?referenceName=13" +
                            "&start=32936732" +
                            "&referenceBases=G" +
                            "&alternateBases=C" +
                            "&type=beacon" +
                            "&assemblyId=GRCh37",
                    REALM))
        .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("[0].beaconInfo.name", equalTo("Beacon Discovery Access"))
            .body("[0].beaconInfo.viewId", equalTo("discovery-access"))
            .body("[0].beaconInfo.resourceId", equalTo("thousand-genomes"))
            .body("[0].beaconInfo.resourceLabel", equalTo("1000 Genomes (non-prod)"))
            .body("[0].exists", anyOf(nullValue(), instanceOf(boolean.class)))
            .statusCode(200);
        // @formatter:on
    }

}
