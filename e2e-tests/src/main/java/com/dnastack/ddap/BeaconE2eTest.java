package com.dnastack.ddap;

import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static java.lang.String.format;
import static org.hamcrest.Matchers.*;

public class BeaconE2eTest extends BaseE2eTest {

    public BeaconE2eTest() {
        this.realmNameSuffix = "_BeaconE2ETest";
    }

    @Before
    public void setupRealm() throws IOException {
        setupRealmConfig("nci_researcher", loadTemplate("/com/dnastack/ddap/config.json"));
    }

    @Test
    public void querySingleBeacon() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher");

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
                    DDAP_TEST_REALM_NAME_PREFIX))
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
