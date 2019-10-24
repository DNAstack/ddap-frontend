package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import dam.v1.DamService;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.notNullValue;


public class VariableSuggestionApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(VariableSuggestionApiTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        validateProtoBuf(damConfig, DamService.DamConfig.newBuilder());
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);
    }

    @Test
    public void shouldFindBigQueryVariables() throws IOException {
        String damToken = fetchRealPersonaDamToken(TestingPersona.ADMINISTRATOR, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.ADMINISTRATOR, REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        getRequestSpecification()
                .log().method()
                .log().uri()
                .when()
                .cookie("dam_token", damToken)
                .cookie("refresh_token", refreshToken)
                .pathParam("realm", REALM)
                .pathParam("damId", DAM_ID)
                .get("/api/v1alpha/{realm}/dam/{damId}/service-templates/bigquery/variables")
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
        String damToken = fetchRealPersonaDamToken(TestingPersona.ADMINISTRATOR, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.ADMINISTRATOR, REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        getRequestSpecification()
                .log().method()
                .log().uri()
                .when()
                .cookie("dam_token", damToken)
                .cookie("refresh_token", refreshToken)
                .pathParam("realm", REALM)
                .pathParam("damId", DAM_ID)
                .get("/api/v1alpha/{realm}/dam/{damId}/service-templates/gcs/variables")
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
        String damToken = fetchRealPersonaDamToken(TestingPersona.ADMINISTRATOR, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.ADMINISTRATOR, REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        getRequestSpecification()
                .log().method()
                .log().uri()
                .when()
                .cookie("dam_token", damToken)
                .cookie("refresh_token", refreshToken)
                .pathParam("realm", REALM)
                .pathParam("damId", DAM_ID)
                .get("/api/v1alpha/{realm}/dam/{damId}/service-templates/invalid/variables")
                .then()
                .log().ifValidationFails()
                .contentType(JSON)
                .statusCode(400);
        // @formatter:on
    }
}
