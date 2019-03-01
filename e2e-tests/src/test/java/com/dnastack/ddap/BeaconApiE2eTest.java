package com.dnastack.ddap;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.response.ValidatableResponse;
import org.apache.commons.io.IOUtils;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.equalTo;


/**
 * 1. Create a beacon resource by doing post/put to DAM via a DDAP endpoint (DDAP bff).
 * 2. Query the above created resource using: "/api/resources/{resourceId}/search", params = "type=beacon
 * 3. Delete the resource in #1. DELETE to DDAP BFF: GET/POST/PUT/PATCH/DELETE /dam/v1/config/resources/resourceName
 */
public class BeaconApiE2eTest extends BaseE2eTest {

    @Test
    public void beaconApiTest() throws IOException {

        RestAssured.baseURI = requiredEnv("E2E_BASE_URI");
        ObjectMapper objectMapper = new ObjectMapper();

        String resourceId="testResource3";

        Map<String, Object> resources;
        try (InputStream in = this.getClass().getClassLoader()
                .getResourceAsStream("resource.json")) {
            resources = objectMapper.readValue(in, Map.class);
        }

        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher");

        /* Create the resource */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .auth().basic("dev", "dev")
                    .cookie("dam_token", validPersonaToken)
                    .body(resources)
                .when()
                    .post("dam/v1alpha/config/resources/" + resourceId)
                .then()
                    .log().ifValidationFails()
                    .statusCode(200);
        // @formatter:on

        /* Query the resource  */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic("dev", "dev")
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/resources/" + resourceId + "/search?type=beacon&assemblyId=GRCh37&referenceName=1&start=156105028&referenceBases=T&alternateBases=C")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0].name", equalTo("Cafe Variome Beacon"))
                    .body("[0].organization", equalTo("University of Leicester"));
        // @formatter:on

        /* Delete the resource */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .auth().basic("dev", "dev")
                    .cookie("dam_token", validPersonaToken)
                    .when()
                    .delete("dam/v1alpha/config/resources/" + resourceId)
                    .then()
                    .log().ifValidationFails()
                    .statusCode(200);
        // @formatter:on
    }

}