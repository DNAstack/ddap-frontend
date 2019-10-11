package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.util.Arrays.asList;
import static java.util.Comparator.comparing;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

/**
 * 1. Test for 4xx error
 */
public class BeaconSearchUnauthorizedBeaconExceptionHandlingTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchUnauthorizedBeaconExceptionHandlingTest.class.getSimpleName());

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
        String badAccessRoleName = "discovery";
        JSONObject badAccessRole = new JSONObject()
                .put("targetScopes", new JSONArray().put("fakeScope"))
                .put("damRoleCategories", new JSONArray().put("metadata"))
                .put("ui", new JSONObject()
                        .put("label", "Role That Will Give a 403")
                        .put("description", "Role That Will Give a 403")
                );
        JSONObject badRoleBind = new JSONObject()
                .put("policies", new JSONArray(asList("test_whitelist")));
        JSONObject realmConfigJson = new JSONObject(baseRealmConfig);
        realmConfigJson.getJSONObject("serviceTemplates")
                .getJSONObject("beacon")
                .getJSONObject("roles")
                .put(badAccessRoleName, badAccessRole);
        realmConfigJson.getJSONObject("resources")
                .getJSONObject("thousand-genomes")
                .getJSONObject("views")
                .getJSONObject("discovery-access")
                .put("defaultRole", badAccessRoleName)
                .getJSONObject("roles")
                .put(badAccessRoleName, badRoleBind);
        return realmConfigJson.toString();
    }

    @Test
    public void shouldGet403ErrorWhenUsingUnderscopedToken() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        BeaconQueryResult[] allResults = getRequestSpecification()
                    .log().method()
                    .log().uri()
                .when()
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
        BeaconQueryResult[] allResults = getRequestSpecification()
                .log().method()
                .log().uri()
                .when()
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
        BeaconQueryResult[] allResults = getRequestSpecification()
                .log().method()
                .log().uri()
                .when()
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
