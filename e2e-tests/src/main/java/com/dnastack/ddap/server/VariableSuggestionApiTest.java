package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import dam.v1.DamService;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.notNullValue;


public class VariableSuggestionApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(VariableSuggestionApiTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String configJson = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(configJson, damConfigBuilder);
        setupRealmConfig("administrator", configJson, "1", REALM);
    }

    @Test
    public void shouldFindBigQueryVariables() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("administrator", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                .log().method()
                .log().uri()
                .when()
                .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                .cookie("dam_token", validPersonaToken)
                .pathParam("realm", REALM)
                .pathParam("damId", DAM_ID)
                .queryParam("serviceTemplate", "bigquery")
                .get("/api/v1alpha/{realm}/serviceTemplates/{damId}/variables")
                .then()
                .log().ifValidationFails()
                .contentType(JSON)
                .statusCode(200)
                .body("project", notNullValue())
                .body("project.regexp", notNullValue(String.class))
                .body("dataset", notNullValue())
                .body("dataset.regexp", notNullValue(String.class));
        // @formatter:on
    }

    @Test
    public void shouldFindGCSVariables() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("administrator", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                .log().method()
                .log().uri()
                .when()
                .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                .cookie("dam_token", validPersonaToken)
                .pathParam("realm", REALM)
                .pathParam("damId", DAM_ID)
                .queryParam("serviceTemplate", "gcs")
                .get("/api/v1alpha/{realm}/serviceTemplates/{damId}/variables")
                .then()
                .log().ifValidationFails()
                .contentType(JSON)
                .statusCode(200)
                .body("project", notNullValue())
                .body("project.regexp", notNullValue(String.class))
                .body("bucket", notNullValue())
                .body("bucket.regexp", notNullValue(String.class));
        // @formatter:on
    }

    @Test
    public void shouldGetBadRequest() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("administrator", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                .log().method()
                .log().uri()
                .when()
                .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                .cookie("dam_token", validPersonaToken)
                .pathParam("realm", REALM)
                .pathParam("damId", DAM_ID)
                .queryParam("serviceTemplate", "invalid")
                .get("/api/v1alpha/{realm}/serviceTemplates/{damId}/variables")
                .then()
                .log().ifValidationFails()
                .contentType(JSON)
                .statusCode(400);
        // @formatter:on
    }
}
