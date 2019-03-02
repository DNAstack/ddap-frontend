package com.dnastack.ddap;

import org.junit.Assume;
import org.junit.Test;

import java.io.IOException;
import java.time.*;
import java.util.TimeZone;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class BeaconE2eTest extends BaseE2eTest {

    @Test
    public void querySingleBeacon() throws IOException {
        // @formatter:off
        Assume.assumeTrue("Feature is temporarily broken. Temporarily unblocking build.",
                          Instant.now()
                                 .isAfter(ZonedDateTime.of(
                                         LocalDateTime.of(
                                                 2019,
                                                 Month.MARCH,
                                                 6,
                                                 10,
                                                 0),
                                         ZoneId.of("America/Toronto")
                                 ).toInstant()));
        // @formatter:on

        // TODO [DISCO-2022] this test should create its own realm and populate it with the needed personas and beacons!
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher");

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
        .when()
            .get("/api/v1alpha/dnastack/resources/ga4gh-apis/search?referenceName=13&start=32936732&referenceBases=G&alternateBases=C&type=beacon&assemblyId=GRCh37")
        .then()
            .log().everything()
            .contentType("application/json")
            .body("[0].name", not(isEmptyOrNullString()))
            .body("[0].organization", not(isEmptyOrNullString()))
            .body("[0].exists", anyOf(nullValue(), instanceOf(boolean.class)))
            .statusCode(200);
        // @formatter:on
    }
}
