package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.lang.String.format;
import static org.junit.Assert.assertEquals;

/**
 * 1. Test for 4xx error
 */
public class BeaconSearchUnauthorizedBeaconExceptionHandlingTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchUnauthorizedBeaconExceptionHandlingTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/beaconSearchUnauthorizedBeaconExceptionHandlingTest.json");
        setupRealmConfig("administrator", realmConfigString, REALM);
    }

    @Test
    public void shouldGetUnauthorized403Error() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        Map<String, Object> result[] = given()
                    .log().method()
                    .log().uri()
                .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/v1alpha/" + REALM + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                .then()
                    .log().body()
                    .contentType(JSON)
                    .statusCode(200)
                    .extract().as(Map[].class);
        // @formatter:on

        Stream<Map<String, Object>> stream = Arrays.stream(result);
        String errorMessage = "Invalid authorization token";

        List<Map<String, Object>> beaconResponseList =
                stream.filter(jsonObj -> {
                    Boolean isThousandGenomes = ((Map<String, Object>) jsonObj.get("resource")).get("name").equals("thousand-genomes");
                    Boolean isCorrectErrorMessage = jsonObj.get("error") != null && ((String) jsonObj.get("error")).contains(errorMessage);
                    return isThousandGenomes && isCorrectErrorMessage;
                })
                .collect(Collectors.toList());
        assertEquals(1, beaconResponseList.size());
    }

}