package com.dnastack.ddapfrontend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.Objects;

import static java.util.Collections.emptyMap;
import static java.util.Collections.singletonMap;

/**
 * Generates unguessable state values for the beginning of an OAuth 2 authorization code flow
 * and verifies those values when it is time to exchange the auth code for a token.
 */
@Component
public class OAuthStateHandler {

    private final String tokenAudience;
    private final Duration tokenTtl;
    private final SecretKey tokenSigningKey;

    @Autowired
    public OAuthStateHandler(@Value("${ddap.state-handler.aud}") String tokenAudience,
                             @Value("${ddap.state-handler.ttl}") Duration tokenTtl,
                             @Value("${ddap.state-handler.signingKey}") String tokenSigningKeyBase64) {
        this.tokenAudience = tokenAudience;
        this.tokenTtl = tokenTtl;
        this.tokenSigningKey = Keys.hmacShaKeyFor(Base64.getMimeDecoder().decode(tokenSigningKeyBase64));
    }

    public String generateAccountLinkingState(String targetAccountId) {
        return generateState(TokenExchangePurpose.LINK,
                singletonMap("targetAccount", targetAccountId));
    }

    public String generateLoginState() {
        return generateState(TokenExchangePurpose.LOGIN, emptyMap());
    }

    private String generateState(TokenExchangePurpose purpose, Map<String, Object> additionalClaims) {
        return Jwts.builder()
                .setAudience(tokenAudience)
                .setExpiration(Date.from(Instant.now().plus(tokenTtl)))
                .claim("purpose", purpose.toString())
                .addClaims(additionalClaims)
                .signWith(tokenSigningKey)
                .compact();
    }

    public TokenExchangePurpose parseAndVerify(String stateStringParam, String stateStringCookie) {
        if (!Objects.equals(stateStringParam, stateStringCookie)) {
            throw new InvalidOAuthStateException("Does not match: " + stateStringCookie);
        }
        try {
            Jws<Claims> state = Jwts.parser()
                    .requireAudience(tokenAudience)
                    .setSigningKey(tokenSigningKey)
                    .parseClaimsJws(stateStringParam);
            String purposeString = state.getBody().get("purpose", String.class);
            return TokenExchangePurpose.valueOf(purposeString);
        } catch (Exception e) {
            throw new InvalidOAuthStateException(e, stateStringParam);
        }
    }
}
