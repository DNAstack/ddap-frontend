package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import dam.v1.DamService;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.RestAssured.given;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

public class DatasetApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(DatasetApiTest.class.getSimpleName());
    private static final String DATASET_URL_WITH_INLINE_SCHEMA = "https://storage.googleapis"
        + ".com/ddap-e2etest-objects/dataset/subjects";
    private static final String DATASET_URL_WITH_RESOLVED_SCHEMA = "https://storage.googleapis"
        + ".com/ddap-e2etest-objects/dataset/subjects-referenced-schema";

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        validateProtoBuf(damConfig, DamService.DamConfig.newBuilder());
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);
    }

    @Test
    public void shouldGetSingleDatasetFromFetch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .queryParam("dataset_url",DATASET_URL_WITH_INLINE_SCHEMA)
        .when()
            .get(format("/api/v1alpha/%s/dataset",REALM))
            .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("objects.size()",greaterThanOrEqualTo(1))
            .body("schema.$id",equalTo("ca.personalgenomes.schema.Subject"))
            .statusCode(200);
    }

    @Test
    public void shouldGetSingleDatasetFromFetchAndResolveRemoteSchema() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .queryParam("dataset_url",DATASET_URL_WITH_RESOLVED_SCHEMA)
        .when()
            .get(format("/api/v1alpha/%s/dataset",REALM))
            .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("objects.size()",greaterThanOrEqualTo(1))
            .body("schema.$id",equalTo("ca.personalgenomes.schema.Subject"))
            .body("schema.properties.blood_type.$id",equalTo("ca.personalgenomes.schemas.BloodType"))
            .body("schema.properties.sex.$id",equalTo("ca.personalgenomes.schemas.Sex"))
            .statusCode(200);
    }

    @Test
    public void shouldGetErrorMessageFromNonexistantDataset() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .queryParam("dataset_url","https://storage.googleapis.com/ga4gh-dataset-sample/dataset/non-existant")
        .when()
            .get(format("/api/v1alpha/%s/dataset",REALM))
            .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("message",notNullValue())
            .body("statusCode",equalTo(404))
            .statusCode(404);
    }



}
