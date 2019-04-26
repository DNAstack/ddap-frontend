package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.google.protobuf.util.JsonFormat;
import dam.v1.e2e.DamService;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;

import static io.restassured.RestAssured.given;
import static io.restassured.http.ContentType.JSON;
import static java.lang.String.format;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.*;


public class AutoCompleteApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(AutoCompleteApiTest.class.getSimpleName());

    @Before
    public void setupRealm() throws IOException {
        String configJson = loadTemplate("/com/dnastack/ddap/autoCompleteConfig.json");
        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(configJson, damConfigBuilder);
        setupRealmConfig("administrator", configJson, REALM);
    }

    @Test
    public void shouldFindSuggestionsForMatchingClaim() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("administrator", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/v1alpha/" + REALM + "/autocomplete/claimValue?claimName=com.dnastack.test.claim")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0]", equalTo("foobar"))
                    .body("[1]", equalTo("foobar2"))
                    .body("[2]", equalTo("foobar3"))
                    .body("[3]", equalTo("foobar4"))
                    .body("[4]", equalTo("foobar5"));
        // @formatter:on
    }

    @Test
    public void shouldFindSuggestionsForVariableValues() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken("administrator", REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        given()
                    .log().method()
                    .log().uri()
                    .when()
                    .auth().basic(DDAP_USERNAME, DDAP_PASSWORD)
                    .cookie("dam_token", validPersonaToken)
                    .get("/api/v1alpha/" + REALM + "/autocomplete/claimValue?claimName=ga4gh.ControlledAccessGrants")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0]", equalTo("https://dac.nih.gov/datasets/phs000711"))
                    .body("[1]", equalTo("https://dac.nih.gov/datasets/phs000712"))
                    .body("[2]", equalTo("https://dac.nih.gov/datasets/phs000713"))
                    .body("[3]", equalTo("https://www.foobar.com"));
        // @formatter:on
    }


}