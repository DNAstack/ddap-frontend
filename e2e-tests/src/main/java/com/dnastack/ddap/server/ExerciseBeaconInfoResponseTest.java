package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.fasterxml.jackson.databind.DeserializationFeature;
import dam.v1.DamService;
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
import java.util.Comparator;
import java.util.List;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.util.stream.Collectors.toList;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.equalTo;


public class ExerciseBeaconInfoResponseTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(ExerciseBeaconInfoResponseTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/aggregateSearchRealmFakeBeaconInfoConfig.json");

        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(realmConfigString, damConfigBuilder);

        setupRealmConfig("administrator", realmConfigString, "1", REALM);
        RestAssured.config = RestAssuredConfig.config()
                                              .objectMapperConfig(new ObjectMapperConfig().jackson2ObjectMapperFactory(
                                                      (cls, charset) -> new com.fasterxml.jackson.databind.ObjectMapper()
                                                              .findAndRegisterModules()
                                                              .configure(
                                                                      DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                                                                      false)));
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
                .log().ifValidationFails()
                .contentType(JSON)
                .statusCode(200);
        // @formatter:on
        final BeaconQueryResult[] allResults = response.as(BeaconQueryResult[].class);
        final List<BeaconInfo> infos = Arrays.stream(allResults)
                                             .filter(bqr -> DAM_ID.equals(bqr.getBeaconInfo().getDamId()))
                                             .map(BeaconQueryResult::getBeaconInfo)
                                             .collect(toList());

        Assert.assertThat(infos,
                          containsInAnyOrder(equalTo(new BeaconInfo("Beacon Discovery Access", "1000 Genomes", DAM_ID)),
                                             equalTo(new BeaconInfo("beacon", "fake-ga4gh", DAM_ID)),
                                             equalTo(new BeaconInfo("beacon", "ga4gh-apis", DAM_ID))));
    }

    @Data
    static class BeaconQueryResult {
        private BeaconInfo beaconInfo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    static class BeaconInfo {
        private String name;
        private String resourceLabel;
        private String damId;
    }

}
