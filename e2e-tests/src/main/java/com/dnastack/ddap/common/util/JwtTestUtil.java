package com.dnastack.ddap.common.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@Slf4j
public class JwtTestUtil {

    private static final TypeReference<Map<String, Object>> MAP_STRING_OBJECT = new TypeReference<Map<String, Object>>() {
    };

    public static Map<String, Object> getBody(String jwt) {
        final String[] jwtParts = jwt.split("\\.", -1);
        assertThat(jwtParts.length, is(3));
        final String jsonBody = new String(Base64.getUrlDecoder().decode(jwtParts[1]), StandardCharsets.UTF_8);
        try {
            return new ObjectMapper().readValue(jsonBody, MAP_STRING_OBJECT);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public static String getSubject(String jwt) {
        Map<String, Object> body = getBody(jwt);
        assertThat(body, hasKey("sub"));
        return (String) body.get("sub");
    }

    public static Map<String, Object> getIdentities(String jwt) {
        Map<String, Object> body = getBody(jwt);
        assertThat(body, hasKey("identities"));
        return (Map<String, Object>) body.get("identities");
    }

}
