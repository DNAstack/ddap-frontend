package com.dnastack.ddap.server;

import static io.restassured.RestAssured.given;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import dam.v1.DamService;
import java.io.IOException;
import java.util.Arrays;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;

public class DatasetApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(DatasetApiTest.class.getSimpleName());
    private static final String DATASET_URL_WITH_INLINE_SCHEMA = "https://storage.googleapis"
        + ".com/ddap-test-objects/dataset/subjects";
    private static final String DATASET_URL_WITH_RESOLVED_SCHEMA = "https://storage.googleapis"
        + ".com/ddap-test-objects/dataset/subjects-referenced-schema";


    @Before
    public void setupRealm() throws IOException {
        String configJson = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(configJson, damConfigBuilder);
        setupRealmConfig("administrator", configJson, "1", REALM);
    }

    @Test
    public void shouldGetSingleDatasetFromFetch() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

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
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

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
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

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

    @Test
    public void shouldReturnViewForBucket() throws IOException{
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList("gs://ga4gh-apis-controlled-access","https://www.googleapis.com/storage/v1/b/ga4gh-apis-controlled-access"))
        .when()
            .post(format("/api/v1alpha/%s/dataset/views",REALM))
            .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("gs://ga4gh-apis-controlled-access[0]",anyOf(equalTo("/dam/1/v1alpha/resources/ga4gh-apis/view"
                        + "/gcs_read"),equalTo("/dam/1/v1alpha/resources/thousand-genomes/view/gcs-file-access")))
            .statusCode(200);

    }

    @Test
    public void shouldReturnEmptyViewsForNonExistantResource() throws IOException{
        String validPersonaToken = fetchRealPersonaDamToken("nci_researcher", REALM);
        String refreshToken = fetchRealPersonaRefreshToken("nci_researcher", REALM);

        // @formatter:off
        given()
            .log().method()
            .log().cookies()
            .log().uri()
            .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList("gs://empty-view"))
        .when()
            .post(format("/api/v1alpha/%s/dataset/views",REALM))
            .then()
            .log().ifValidationFails()
            .body("isEmpty()",Matchers.is(true))
            .contentType("application/json")
            .statusCode(200);

    }

}
