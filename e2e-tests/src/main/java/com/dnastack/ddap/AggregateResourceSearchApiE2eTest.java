package com.dnastack.ddap;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.equalTo;


/**
 * 1. Read the realm json in basee2e class, call getRealmConfig in basee2e class, pass in parameter of name
 * of resource, list of view types and it will return to you the modified realm config.
 */
public class AggregateResourceSearchApiE2eTest extends BaseE2eTest {


    protected String modifyRealmTemplate(String realmConfig, String resourceName, String resourceFilePath) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode realmConfigJsonRoot = mapper.readValue(realmConfig, JsonNode.class);

        ObjectNode resources = (ObjectNode) realmConfigJsonRoot.get("resources");

        String resourceString = loadTemplate(resourceFilePath);
        JsonNode resourceJson = mapper.readValue(resourceString, JsonNode.class);

        ((ObjectNode) resources).put(resourceName, resourceJson);
        ((ObjectNode) realmConfigJsonRoot).put("resources", resources);

        return realmConfigJsonRoot.toString();
    }


    @Before
    public void setupRealm() throws IOException {
        String realmConfigString = loadTemplate("/com/dnastack/ddap/config.json");
        realmConfigString = modifyRealmTemplate(realmConfigString, "testResource3", "/com/dnastack/ddap/resource.json");
        realmConfigString = modifyRealmTemplate(realmConfigString, "testResource2", "/com/dnastack/ddap/resource2.json");
        setupRealmConfig("nci_researcher", realmConfigString);
    }

    @Test
    public void beaconApiTest() throws IOException {

        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher");

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/v1alpha/nci_researcher/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
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