package com.dnastack.ddapfrontend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Base64;

@Slf4j
@Component
public class JwtTokenParser {

    private final String tokenAudience;
    private final Duration tokenTtl;
    private final SecretKey tokenSigningKey;

    @Autowired
    public JwtTokenParser(@Value("${ddap.state-handler.aud}") String tokenAudience,
                          @Value("${ddap.state-handler.ttl}") Duration tokenTtl,
                          @Value("${ddap.state-handler.signingKey}") String tokenSigningKeyBase64) {
        this.tokenAudience = tokenAudience;
        this.tokenTtl = tokenTtl;
        this.tokenSigningKey = Keys.hmacShaKeyFor(Base64.getMimeDecoder().decode(tokenSigningKeyBase64));
    }

    public void parseScopes(String jwt) {
//        Jwt token = Jwts.parser()
//                .requireAudience(tokenAudience)
//                .parse(jwt);
        Jws<Claims> claims = Jwts.parser()
                .requireAudience(tokenAudience)
                .setSigningKey(tokenSigningKey)
                .parseClaimsJws(jwt);
        log.info("{}", claims);
    }

    public class Scope {
        private String value;
    }

}
