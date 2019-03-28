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
import static org.junit.Assert.assertEquals;

/**
 * 1. Test for when no server found or no response from a beacon error
 */
public class BeaconSearchExceptionNoServerResponseHandlingTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(BeaconSearchExceptionNoServerResponseHandlingTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/beaconServerNotFound.json");
        setupRealmConfig("nci_researcher", realmConfigString, REALM);
    }

    @Test
    public void shouldGetNoBeaconServerFoundError() throws IOException {
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
                    //.log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .extract().as(Map[].class);
        // @formatter:on

        Stream<Map<String, Object>> stream = Arrays.stream(result);
        String errorMessage = "Server not found: java.net.UnknownHostException";

        List<Map<String, Object>> beaconResponseList =
                stream.filter(jsonObj -> {
                    String errorMessageReceived = (String) jsonObj.get("error");
                    Boolean isCorrectErrorMessage = errorMessageReceived.startsWith(errorMessage);
                    return isCorrectErrorMessage;
                })
                .collect(Collectors.toList());
        assertEquals(beaconResponseList.size(), 2);
    }

}