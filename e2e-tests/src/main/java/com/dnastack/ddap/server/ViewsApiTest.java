package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import dam.v1.DamService;
import org.hamcrest.Matchers;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;

import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.*;

public class ViewsApiTest extends AbstractBaseE2eTest {


    private static final String REALM = generateRealmName(ViewsApiTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        validateProtoBuf(damConfig, DamService.DamConfig.newBuilder());
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);
    }

    @Test
    public void shouldReturnViewForBucket() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList("gs://ga4gh-apis-controlled-access","https://www.googleapis.com/storage/v1/b/ga4gh-apis-controlled-access"))
        .when()
            .post(format("/api/v1alpha/%s/views/lookup",REALM))
            .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("gs://ga4gh-apis-controlled-access",
                anyOf(Matchers.hasItem("/dam/1/v1alpha/" + REALM + "/resources/ga4gh-apis/views/gcs_read"),
                    Matchers.hasItem("/dam/1/v1alpha/" + REALM + "/resources/thousand-genomes/views/gcs-file-access")))
            .statusCode(200);
        // @formatter:on

    }

    @Test
    public void shouldNotReturnViewForPartialSubset() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList("gs://ga4gh-apis-controlled-access-with-more-stuff"))
        .when()
            .post(format("/api/v1alpha/%s/views/lookup",REALM))
            .then()
            .log().ifValidationFails()
            .contentType("application/json")
            .body("isEmpty()",Matchers.is(true))
            .statusCode(200);
        // @formatter:on

    }

    @Test
    public void shouldReturnEmptyViewsForNonExistantResource() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList("gs://empty-view"))
        .when()
            .post(format("/api/v1alpha/%s/views/lookup",REALM))
            .then()
            .log().ifValidationFails()
            .body("isEmpty()",Matchers.is(true))
            .contentType("application/json")
            .statusCode(200);
        // @formatter:on

    }

    @Test
    public void shouldReturnListOfAuthorizedViews() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String view = "/dam/1/v1alpha/" + REALM + "/resources/ga4gh-apis/views/gcs_read";

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", validPersonaToken)
            .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList(view))
        .when()
            .post(format("/api/v1alpha/%s/views/tokens",REALM))
            .then()
            .log().ifValidationFails()
            .root("[0]")
            .body("view",equalTo(view))
            .body("locationAndToken.name",equalTo("ga4gh-apis"))
            .body("locationAndToken.token",notNullValue())
            .body("locationAndToken.view",notNullValue())
            .body("keySet()",not(hasItem("exception")))
            .contentType("application/json")
            .statusCode(200);
        // @formatter:on
    }

    @Test
    public void shouldReturnListOfAuthorizedViewsWithError() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.USER_WITH_ACCESS, REALM);
        String view = "/dam/1/v1alpha/" + REALM + "/resources/ga4gh-apis/views/invalid";

        // @formatter:off
        getRequestSpecification()
            .log().method()
            .log().cookies()
            .log().uri()
            .cookie("dam_token", validPersonaToken)
                .cookie("refresh_token", refreshToken)
            .contentType("application/json")
            .body(Arrays.asList(view))
        .when()
            .post(format("/api/v1alpha/%s/views/tokens",REALM))
            .then()
            .log().ifValidationFails()
            .root("[0]")
            .body("view",equalTo(view))
            .body("keySet()",not(hasItem("locationAndToken")))
            .body("exception",notNullValue())
            .body("exception.statusCode",equalTo(404))
            .contentType("application/json")
            .statusCode(200);
        // @formatter:on
    }

}
