package com.dnastack.ddap;

import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static java.lang.String.format;
import static org.hamcrest.Matchers.*;

public class BeaconE2eTest extends BaseE2eTest {

    @Before
    public void setupRealm() throws IOException {
        setupRealmConfig("dr_joe_era_commons", loadTemplate("/com/dnastack/ddap/config.json"));
    }

    @Test
    public void querySingleBeacon() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("dr_joe_era_commons");

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
        .when()
            .get(format(
                    "/api/v1alpha/%s/resources/thousand-genomes/search" +
                            "?referenceName=13" +
                            "&start=32936732" +
                            "&referenceBases=G" +
                            "&alternateBases=C" +
                            "&type=beacon" +
                            "&assemblyId=GRCh37",
                    DDAP_TEST_REALM))
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
