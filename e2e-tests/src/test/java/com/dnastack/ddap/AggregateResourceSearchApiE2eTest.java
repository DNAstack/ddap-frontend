package com.dnastack.ddap;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.response.ValidatableResponse;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.equalTo;


/**
 * 1. Create 2 beacon resources.
 * 2. Query the above created resources using aggregate resource search.
 * 3. Delete the 2 new created resources.
 */
public class AggregateResourceSearchApiE2eTest extends BaseE2eTest {

    @Test
    public void beaconApiTest() throws IOException {

        RestAssured.baseURI = requiredEnv("E2E_BASE_URI");
        ObjectMapper objectMapper = new ObjectMapper();

        String resourceId1="testResource3";
        String resourceId2="testResource2";

        List<String> resourceList = new ArrayList<>();
        resourceList.add(resourceId1);
        resourceList.add(resourceId2);

        Map<String, Object> resource1, resource2;
        try (InputStream in = this.getClass().getClassLoader()
                .getResourceAsStream("resource.json")) {
            resource1 = objectMapper.readValue(in, Map.class);
        }

        try (InputStream in = this.getClass().getClassLoader()
                .getResourceAsStream("resource2.json")) {
            resource2 = objectMapper.readValue(in, Map.class);
        }

        List<Map<String, Object>> resourceCreateList = new ArrayList<>();
        resourceCreateList.add(resource1);
        resourceCreateList.add(resource2);

        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher");

        Integer counter = 0;
        for (String resourceName: resourceList) {
            /* Create the resource */
            // @formatter:off
            given()
                    .log().method()
                    .log().uri()
                    .auth().basic("dev", "dev")
                    .cookie("dam_token", validPersonaToken)
                    .body(resourceCreateList.get(counter++))
                    .when()
                    .post("dam/v1alpha/config/resources/" + resourceName)
                    .then()
                    .log().ifValidationFails()
                    .statusCode(200);
            // @formatter:on
        }

        /* Run the aggregate search query  */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic("dev", "dev")
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/resources/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0].name", equalTo("Cafe Variome Beacon"))
                    .body("[0].organization", equalTo("University of Leicester"))
                    .body("[1].name", equalTo("Cafe Variome Beacon"))
                    .body("[1].organization", equalTo("University of Leicester"));
        // @formatter:on


        /* Delete the resources */
        for (String resourceName: resourceList) {
            /* Delete the resource */
            // @formatter:off
            given()
                    .log().method()
                    .log().uri()
                    .auth().basic("dev", "dev")
                    .cookie("dam_token", validPersonaToken)
                    .when()
                    .delete("dam/v1alpha/config/resources/" + resourceName)
                    .then()
                    .log().ifValidationFails()
                    .statusCode(200);
            // @formatter:on
        }

    }

}