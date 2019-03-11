package com.dnastack.ddap.server;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.equalTo;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import java.io.IOException;
import org.junit.Before;
import org.junit.Test;


public class AggregateResourceSearchApiE2eTest extends AbstractBaseE2eTest {

    private static final String realmName = DDAP_TEST_REALM_NAME_PREFIX + "_AggregateResourceSearch";

    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/aggregateSearchRealmConfig.json");
        setupRealmConfig("nci_researcher", realmConfigString, realmName);
    }

    @Test
    public void beaconApiTest() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", realmName);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/v1alpha/" + realmName + "/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0].name", equalTo("Cafe Variome Beacon"))
                    .body("[0].organization", equalTo("University of Leicester"))
                    .body("[1].name", equalTo("Cafe Variome Beacon"))
                    .body("[1].organization", equalTo("University of Leicester"));
        // @formatter:on
    }

}