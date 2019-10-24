package com.dnastack.ddap.server;

import com.dnastack.ddap.common.AbstractBaseE2eTest;
import com.dnastack.ddap.common.TestingPersona;
import dam.v1.DamService;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.equalTo;


public class AutoCompleteApiTest extends AbstractBaseE2eTest {

    private static final String REALM = generateRealmName(AutoCompleteApiTest.class.getSimpleName());

    @BeforeClass
    public static void oneTimeSetup() throws IOException {
        final String damConfig = loadTemplate("/com/dnastack/ddap/adminConfig.json");
        validateProtoBuf(damConfig, DamService.DamConfig.newBuilder());
        setupRealmConfig(TestingPersona.ADMINISTRATOR, damConfig, "1", REALM);
    }

    @Test
    public void shouldFindSuggestionsForMatchingClaim() throws IOException {
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.ADMINISTRATOR, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.ADMINISTRATOR, REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        getRequestSpecification()
                    .log().method()
                    .log().uri()
                    .when()
                    .cookie("dam_token", validPersonaToken)
                    .cookie("refresh_token", refreshToken)
                    .get("/api/v1alpha/" + REALM + "/dam/" + DAM_ID + "/autocomplete/claim-value?claimName=com.dnastack.test.claim")
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
        String validPersonaToken = fetchRealPersonaDamToken(TestingPersona.ADMINISTRATOR, REALM);
        String refreshToken = fetchRealPersonaRefreshToken(TestingPersona.ADMINISTRATOR, REALM);

        /* Run the aggregate search query on the realm */
        // @formatter:off
        getRequestSpecification()
                    .log().method()
                    .log().uri()
                    .when()
                    .cookie("dam_token", validPersonaToken)
                    .cookie("refresh_token", refreshToken)
                    .get("/api/v1alpha/" + REALM + "/dam/" + DAM_ID + "/autocomplete/claim-value?claimName=ControlledAccessGrants")
                    .then()
                    .log().ifValidationFails()
                    .contentType(JSON)
                    .statusCode(200)
                    .body("[0]", equalTo("https://dnastack.com/datasets/1"))
                    .body("[1]", equalTo("https://dnastack.com/datasets/2"))
                    .body("[2]", equalTo("https://dnastack.com/datasets/3"))
                    .body("[3]", equalTo("https://dnastack.com/used/value"))
                    .body("[4]", equalTo("https://www.foobar.com"));
        // @formatter:on
    }


}
