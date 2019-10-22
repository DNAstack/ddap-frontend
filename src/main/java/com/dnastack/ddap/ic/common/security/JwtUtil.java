package com.dnastack.ddap.ic.common.security;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static java.util.Arrays.asList;

@Slf4j
public class JwtUtil {

    private static String dangerousStopgapParseToken(String jwt) {
        // FIXME [DISCO-1995] huge security hole! we must validate this token properly!
        final String[] jwtParts = jwt.split("\\.", -1);
        if (jwtParts.length != 3) {
            log.info("Treating malformed token cookie as missing ({} parts != 3)", jwtParts.length);
            return null;
        }

        try {
            return new String(Base64.getUrlDecoder().decode(jwtParts[1]), StandardCharsets.UTF_8);
        } catch (IllegalArgumentException e) {
            log.info("Treating malformed token cookie as missing (couldn't base64 decode body)", e);
            return null;
        }
    }

    public static Optional<JwtSubject> dangerousStopgapExtractSubject(String jwt) {
        String jsonBody = dangerousStopgapParseToken(jwt);
        final ObjectMapper objectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        final JwtSubject decodedBody;
        try {
            decodedBody = objectMapper.readValue(jsonBody, JwtSubject.class);
        } catch (IOException e) {
            log.info("Treating malformed token cookie as missing (couldn't JSON decode body)", e);
            return Optional.empty();
        }

        log.debug("Decoded token {}", jsonBody);
        return Optional.of(decodedBody);
    }

    @Data
    public static class JwtSubject {
        String sub;
        List<String> scope;

        @JsonSetter
        public void setScope(String scope) {
            this.scope = asList(scope.split(" "));
        }
    }

}
