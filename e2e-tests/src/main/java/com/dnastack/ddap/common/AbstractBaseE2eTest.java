package com.dnastack.ddap.common;

import com.dnastack.ddap.common.WalletLoginStrategy.LoginInfo;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import dam.v1.DamService;
import io.restassured.RestAssured;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.specification.RequestSpecification;
import lombok.Data;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.util.EntityUtils;
import org.junit.Before;
import org.junit.BeforeClass;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static java.lang.Math.min;
import static java.lang.String.format;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;

@SuppressWarnings("Duplicates")
public abstract class AbstractBaseE2eTest {

    public static final String DDAP_USERNAME = optionalEnv("E2E_BASIC_USERNAME",null);
    public static final String DDAP_PASSWORD = optionalEnv("E2E_BASIC_PASSWORD", null);
    public static final String DDAP_BASE_URL = requiredEnv("E2E_BASE_URI");
    public static final String DAM_ID = requiredEnv("E2E_DAM_ID");
    public static final String DDAP_TEST_REALM_NAME_PREFIX = requiredEnv("E2E_TEST_REALM");
    public static final String CLIENT_ID = requiredEnv("E2E_CLIENT_ID");
    public static final String TEST_PROJECT = requiredEnv("E2E_TEST_PROJECT");
    public static final String TEST_BUCKET = requiredEnv("E2E_TEST_BUCKET");
    public static final String NAMESPACE =  requiredEnv("E2E_TEST_NAMESPACE");
    public static final String TRUSTED_SOURCE =  optionalEnv("E2E_TRUSTED_SOURCE", "https://ddap.test.source.dnastack.com");
    public static final String PASSPORT_ISSUER = requiredEnv("E2E_PASSPORT_ISSUER");
    public static final String TEST_WHITELIST_VALUE = optionalEnv("E2E_TEST_WHITELIST_VALUE", stripTrailingSlash(DDAP_BASE_URL).replaceFirst("-candidate\\.", "."));
    public static final String IC_BASE_URL = requiredEnv("E2E_IC_BASE_URL");
    // Current size limit on realm names in DAM
    public static final int REALM_NAME_LIMIT = 40;
    public static final String SERVICE_ACCOUNT_PROJECT = requiredEnv("E2E_SERVICE_ACCOUNT_PROJECT");


    public static final String PERSONA_LOGIN_STRATEGY = "PersonaLoginStrategy";
    public static final String WALLET_LOGIN_STRATEGY = "WalletLoginStrategy";
    public static final String LOGIN_STRATEGY_NAME = optionalEnv("E2E_LOGIN_STRATEGY", PERSONA_LOGIN_STRATEGY);

    protected static LoginStrategy loginStrategy;

    protected static String generateRealmName(String testClassName) {
        /*
         * Temporarily removed randomness to avoid service account quotas. See DISCO-2416
         */
        final String nameWithoutStamp = DDAP_TEST_REALM_NAME_PREFIX + "_" + testClassName;
        return nameWithoutStamp.substring(0, min(REALM_NAME_LIMIT, nameWithoutStamp.length()));
    }

    @BeforeClass
    public static void staticSetup() {
        switch (LOGIN_STRATEGY_NAME) {
            case PERSONA_LOGIN_STRATEGY:
                loginStrategy = new PersonaLoginStrategy();
                break;
            case WALLET_LOGIN_STRATEGY:
                final Map<String, LoginInfo> personalAccessTokens = new HashMap<>();
                personalAccessTokens.put(TestingPersona.ADMINISTRATOR.getId(), new LoginInfo(requiredEnv("E2E_ADMIN_USER_EMAIL"), requiredEnv("E2E_ADMIN_USER_TOKEN")));
                personalAccessTokens.put(TestingPersona.USER_WITH_ACCESS.getId(), new LoginInfo(requiredEnv("E2E_WHITELIST_USER_EMAIL"), requiredEnv("E2E_WHITELIST_USER_TOKEN")));
                personalAccessTokens.put(TestingPersona.USER_WITHOUT_ACCESS.getId(), new LoginInfo(requiredEnv("E2E_PLAIN_USER_EMAIL"), requiredEnv("E2E_PLAIN_USER_TOKEN")));
                loginStrategy = new WalletLoginStrategy(personalAccessTokens, requiredEnv("E2E_WALLET_URL"), PASSPORT_ISSUER.replaceAll("/oidc$", ""));
                break;
            default:
                throw new IllegalArgumentException(format("Unrecognized login strategy [%s]", LOGIN_STRATEGY_NAME));
        }
        RestAssured.config = RestAssuredConfig.config()
                .objectMapperConfig(new ObjectMapperConfig().jackson2ObjectMapperFactory(
                        (cls, charset) -> {
                            ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
                            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                            return mapper;
                        }
                ));
    }

    @Before
    public void setUp() {
        RestAssured.baseURI = DDAP_BASE_URL;
    }

    protected static RequestSpecification getRequestSpecification(){
        if(DDAP_USERNAME == null && DDAP_PASSWORD == null) {
            return given();
        }else{
            return given().auth().basic(DDAP_USERNAME, DDAP_PASSWORD);
        }
    }

    protected static String requiredEnv(String name) {
        String val = System.getenv(name);
        if (val == null) {
            fail("Environnment variable `" + name + "` is required");
        }
        return val;
    }

    public static String optionalEnv(String name, String defaultValue) {
        String val = System.getenv(name);
        if (val == null) {
            return defaultValue;
        }
        return val;
    }

    protected static void validateProtoBuf(String resourceJsonString, Message.Builder builder) {
        try {
            JsonFormat.parser().merge(resourceJsonString, builder);
        } catch(Exception e) {
            throw new IllegalStateException("Failed to parse proto", e);
        }
    }

    @Data
    static class IcConfig {
        @JsonAnySetter
        private Map<String, Object> others = new HashMap<>();

        private Map<String, Map<String, Object>> identityProviders;

        @JsonAnyGetter
        public Map<String, Object> getOthers() {
            return others;
        }
    }

    protected static void setupIcConfig(TestingPersona persona, String config, String realmName) throws IOException {
        final CookieStore cookieStore = loginStrategy.performPersonaLogin(persona.getId(), realmName);

        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        final ObjectMapper mapper = new ObjectMapper();

        // Don't clobber wallet config in case we are using wallet test user login
        final Map<String, Object> walletConfig = getIdentityProviderConfig(realmName, "wallet", httpclient);
        if (walletConfig != null) {
            final IcConfig parsedConfig = mapper.readValue(config, IcConfig.class);
            parsedConfig.getIdentityProviders().put("wallet", walletConfig);
            config = mapper.writeValueAsString(parsedConfig);
        }

        final Map<String, Object> personaConfig = getIdentityProviderConfig(realmName, "persona", httpclient);;
        if(personaConfig !=null) {
            final IcConfig parsedConfig = mapper.readValue(config, IcConfig.class);
            parsedConfig.getIdentityProviders().put("persona", personaConfig);
            config = mapper.writeValueAsString(parsedConfig);
        }

        final String modificationPayload = format("{ \"item\": %s }", config);

        {
            HttpPut request = new HttpPut(format("%s/identity/v1alpha/%s/config", DDAP_BASE_URL, realmName));
            addDdapBasicAuthHeader(request);
            request.setEntity(new StringEntity(modificationPayload));

            final HttpResponse response = httpclient.execute(request);
            final String responseBody = EntityUtils.toString(response.getEntity());

            assertThat("Unable to set realm config. Response:\n" + responseBody,
                       response.getStatusLine().getStatusCode(),
                       allOf(greaterThanOrEqualTo(200), lessThan(300)));
        }
    }

    protected static void setupRealmConfig(TestingPersona persona, String config, String damId, String realmName) throws IOException {
        DamService.DamConfig.Builder damConfigBuilder = DamService.DamConfig.newBuilder();
        validateProtoBuf(config, damConfigBuilder);

        final String modificationPayload = format("{ \"item\": %s }", config);
        /*
         Use the master realm because some tests break the ability to reset realms in future runs.
         In particular, tests that reset the IC config can change the 'ga4gh_dam` client ID which needs
         to be a particular value (configured in master) for passport tokens to have a validatable audience
         */
        final CookieStore cookieStore = loginStrategy.performPersonaLogin(persona.getId(), "master");

        final HttpClient httpclient = HttpClientBuilder.create().setDefaultCookieStore(cookieStore).build();
        HttpPut request = new HttpPut(format("%s/dam/%s/v1alpha/%s/config", DDAP_BASE_URL, damId, realmName));
        addDdapBasicAuthHeader(request);
        request.setEntity(new StringEntity(modificationPayload));

        System.out.printf("Sending setup realm request to URI [%s]\n", request.getURI());

        final HttpResponse response = httpclient.execute(request);
        String responseBody = EntityUtils.toString(response.getEntity());

        assertThat(format("Unable to set realm config. Response:\n%s\nConfig:\n%s", responseBody, config),
                   response.getStatusLine().getStatusCode(),
                   allOf(greaterThanOrEqualTo(200), lessThan(300)));
    }

    protected static String loadTemplate(String resourcePath) {
        assertThat("Given config was null", resourcePath, notNullValue());
        final String resourceTemplate;
        try (InputStream is = AbstractBaseE2eTest.class.getResourceAsStream(resourcePath)) {
            final StringWriter writer = new StringWriter();
            IOUtils.copy(is, writer, Charset.forName("UTF-8"));
            resourceTemplate = writer.toString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to load test resource template.", e);
        }
        return resourceTemplate
                .replace("$$E2E_BASE_URI$$", stripTrailingSlash(DDAP_BASE_URL))
                .replace("$$E2E_CLIENT_ID$$", CLIENT_ID)
                .replace("$$E2E_SERVICE_ACCOUNT_PROJECT$$", SERVICE_ACCOUNT_PROJECT)
                .replace("$$E2E_PASSPORT_ISSUER$$", PASSPORT_ISSUER)
                .replace("$$E2E_TEST_BUCKET$$", TEST_BUCKET)
                .replace("$$E2E_TEST_PROJECT$$",TEST_PROJECT)
                .replace("$$E2E_TEST_NAMESPACE$$", NAMESPACE)
                .replace("$$E2E_TRUSTED_SOURCE$$", TRUSTED_SOURCE)
                .replace("$$E2E_TEST_WHITELIST_VALUE$$", TEST_WHITELIST_VALUE);
    }

    private static String stripTrailingSlash(String url) {
        return (url.endsWith("/"))
                ? url.substring(0, url.length() - 1)
                : url;
    }

    protected String fetchRealPersonaIcToken(String personaName, String realmName, String ... scopes) throws IOException {
        return fetchRealPersonaToken(personaName, "ic_token", realmName, scopes);
    }

    protected String fetchRealPersonaIcToken(TestingPersona persona, String realmName, String ... scopes) throws IOException {
        return fetchRealPersonaIcToken(persona.getId(), realmName, scopes);
    }

    protected String fetchRealPersonaDamToken(String personaName, String realmName) throws IOException {
        return fetchRealPersonaToken(personaName, "dam_token", realmName);
    }

    protected String fetchRealPersonaDamToken(TestingPersona persona, String realmName) throws IOException {
        return fetchRealPersonaDamToken(persona.getId(), realmName);
    }

    protected String fetchRealPersonaRefreshToken(String personaName, String realmName) throws IOException {
        return fetchRealPersonaToken(personaName, "refresh_token", realmName);
    }

    protected String fetchRealPersonaRefreshToken(TestingPersona persona, String realmName) throws IOException {
        return fetchRealPersonaRefreshToken(persona.getId(), realmName);
    }

    private String fetchRealPersonaToken(String personaName, String tokenCookieName, String realmName, String ... scopes) throws IOException {
        final CookieStore cookieStore = loginStrategy.performPersonaLogin(personaName, realmName, scopes);

        BasicClientCookie tokenCookie = (BasicClientCookie) cookieStore.getCookies().stream()
                .filter(c -> tokenCookieName.equals(c.getName()))
                .findFirst()
                .orElse(null);

        assertThat(tokenCookie, notNullValue());

        // Require cookies to be marked as secure unless we're testing on localhost
        if (!(DDAP_BASE_URL.startsWith("http://localhost:") || DDAP_BASE_URL.startsWith("http://host.docker.internal:"))) {
            assertThat("It looks like DDAP_COOKIES_SECURE=true isn't set on this deployment",
                    tokenCookie.containsAttribute("secure"), is(true));
            assertThat(tokenCookie.getAttribute("secure"), nullValue());
        }

        assertThat(tokenCookie.containsAttribute("httponly"), is(true));
        assertThat(tokenCookie.getAttribute("httponly"), nullValue());

        return tokenCookie.getValue();
    }

    public static void addDdapBasicAuthHeader(HttpRequest request) {
        String auth = DDAP_USERNAME + ":" + DDAP_PASSWORD;
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.ISO_8859_1));
        request.setHeader(HttpHeaders.AUTHORIZATION, "Basic " + new String(encodedAuth));
    }

    private static Map<String, Object> getIdentityProviderConfig(String realmName,
                                                          String provider,
                                                          HttpClient httpclient) throws IOException {
        final Map<String, Object> providerConfig;
        final ObjectMapper mapper = new ObjectMapper();

        HttpGet request = new HttpGet(format("%s/identity/v1alpha/%s/config/identityProviders/%s",
                DDAP_BASE_URL, realmName, provider));
        addDdapBasicAuthHeader(request);

        final HttpResponse response = httpclient.execute(request);
        final int statusCode = response.getStatusLine().getStatusCode();
        if (statusCode == 200) {
            final String responseBody = EntityUtils.toString(response.getEntity());
            providerConfig = mapper.readValue(responseBody, new TypeReference<Map<String, Object>>() {});
        } else {
            providerConfig = null;
        }
        return providerConfig;
    }
}
