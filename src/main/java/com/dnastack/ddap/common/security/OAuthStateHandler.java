package com.dnastack.ddap.common.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.time.Duration;
import java.util.Base64;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.singletonMap;

/**
 * Generates unguessable state values for the beginning of an OAuth 2 authorization code flow
 * and verifies those values when it is time to exchange the auth code for a token.
 */
@Component
public class OAuthStateHandler {

    private static final String DESTINATION_AFTER_LOGIN = "destinationAfterLogin";
    private static final String CLI_SESSION_ID_KEY = "cliSessionId";
    private final com.dnastack.ddap.common.security.JwtHandler jwtHandler;

    @Autowired
    public OAuthStateHandler(@Value("${ddap.state-handler.aud}") String tokenAudience,
                             @Value("${ddap.state-handler.ttl}") Duration tokenTtl,
                             @Value("${ddap.state-handler.signingKey}") String tokenSigningKeyBase64) {
        this.jwtHandler = new com.dnastack.ddap.common.security.JwtHandler(tokenAudience,
                                         tokenTtl,
                                         Keys.hmacShaKeyFor(Base64.getMimeDecoder().decode(tokenSigningKeyBase64)));
    }

    public String generateAccountLinkingState(String targetAccountId) {
        return generateState(TokenExchangePurpose.LINK,
                singletonMap("targetAccount", targetAccountId));
    }

    public String generateLoginState(URI destinationAfterLogin) {
        return generateState(TokenExchangePurpose.LOGIN,
                singletonMap(DESTINATION_AFTER_LOGIN, destinationAfterLogin));
    }

    public String generateCommandLineLoginState(String cliSessionId) {
        return generateState(TokenExchangePurpose.CLI_LOGIN,
                             singletonMap(CLI_SESSION_ID_KEY, cliSessionId));
    }


    private String generateState(TokenExchangePurpose purpose, Map<String, Object> additionalClaims) {
        return jwtHandler.createBuilder(com.dnastack.ddap.common.security.JwtHandler.TokenKind.STATE)
                         .claim("purpose", purpose.toString())
                         .addClaims(additionalClaims)
                         .compact();
    }

    public TokenExchangePurpose parseAndVerify(String stateStringParam, String stateStringCookie) {
        if (!Objects.equals(stateStringParam, stateStringCookie)) {
            throw new InvalidOAuthStateException("CSRF state cookie mismatch", stateStringCookie);
        }
        try {
            Jws<Claims> state = parseStateToken(stateStringParam);
            String purposeString = state.getBody().get("purpose", String.class);
            return TokenExchangePurpose.valueOf(purposeString);
        } catch (Exception e) {
            throw new InvalidOAuthStateException("Invalid state token", e, stateStringParam);
        }
    }

    private Jws<Claims> parseStateToken(String jwt) {
        return jwtHandler.createParser(JwtHandler.TokenKind.STATE)
                         .parseClaimsJws(jwt);
    }

    public Optional<URI> getDestinationAfterLogin(String stateToken) {
        return Optional.ofNullable(parseStateToken(stateToken).getBody().get(DESTINATION_AFTER_LOGIN, String.class))
                .map(URI::create);
    }

    public Optional<String> extractCliSessionId(String stateToken) {
        return Optional.ofNullable(parseStateToken(stateToken).getBody().get(CLI_SESSION_ID_KEY, String.class));
    }

}
