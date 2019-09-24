package com.dnastack.ddap.server;

import com.dnastack.ddap.common.*;
import com.dnastack.ddap.common.TestingPersona;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import lombok.Data;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.*;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
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
        final String baseRealmConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");

        final ObjectMapper objectMapper = new ObjectMapper();

        /*
         * Instead of having a mostly copy-pasted duplicate config file for this test,
         * let's just modify the config programmatically with the changes we need.
         */
        final DamConfig damConfig = objectMapper.readValue(baseRealmConfig, DamConfig.class);
        final RoleDef badAccessRole = new RoleDef(singletonList("fakeScope"), singletonList("metadata"), new UiMetadata("Role That Will Give a 403", "Role That Will Give a 403"));
        final String badAccessRoleName = "discovery";
        damConfig.getServiceTemplates().get("beacon").getRoles().put(badAccessRoleName, badAccessRole);
        final Resource thousandGenomesResource = damConfig.getResources().get("thousand-genomes");
        final View beaconView = thousandGenomesResource.getViews().get("discovery-access");
        final RoleBind badRoleBind = new RoleBind(asList("bona_fide", "ethics"));
        beaconView.getRoles().put(badAccessRoleName, badRoleBind);
        beaconView.setDefaultRole(badAccessRoleName);

        final String realmConfig = objectMapper.writeValueAsString(damConfig);

        setupRealmConfig(TestingPersona.ADMINISTRATOR, realmConfig, "1", REALM);
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
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.NCI_RESEARCHER, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.NCI_RESEARCHER, REALM);

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
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.ADMINISTRATOR, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.ADMINISTRATOR, REALM);

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
