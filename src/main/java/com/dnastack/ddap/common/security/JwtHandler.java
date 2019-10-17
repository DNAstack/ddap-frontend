package com.dnastack.ddap.common.security;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;

import javax.crypto.SecretKey;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;

@AllArgsConstructor
public class JwtHandler {
    private final String tokenAudience;
    private final Duration tokenTtl;
    private final SecretKey tokenSigningKey;

    public JwtBuilder createBuilder(TokenKind kind) {
        return Jwts.builder()
                   .setAudience(tokenAudience)
                   .setExpiration(Date.from(Instant.now().plus(tokenTtl)))
                   .claim("tokenKind", kind.toString().toLowerCase())
                   .signWith(tokenSigningKey);
    }

    public JwtParser createParser(TokenKind kind) {
        return Jwts.parser()
                   .requireAudience(tokenAudience)
                   .require("tokenKind", kind.toString().toLowerCase())
                   .setSigningKey(tokenSigningKey);
    }

    public enum TokenKind {
        STATE, BEARER
    }
}
