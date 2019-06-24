package com.dnastack.ddapfrontend.cli;

import com.dnastack.ddapfrontend.client.ic.ReactiveIdentityConcentratorClient;
import com.dnastack.ddapfrontend.model.CommandLineLoginStartModel;
import com.dnastack.ddapfrontend.security.JwtHandler;
import com.dnastack.ddapfrontend.security.OAuthStateHandler;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.Duration;
import java.util.Base64;
import java.util.UUID;

import static java.lang.String.format;

@Service
@Slf4j
public class CommandLineLoginService {
    private final ReactiveIdentityConcentratorClient icClient;
    private final OAuthStateHandler stateHandler;

    private final JwtHandler jwtHandler;

    @Autowired
    public CommandLineLoginService(OAuthStateHandler stateHandler,
                                   ReactiveIdentityConcentratorClient icClient,
                                   @Value("${ddap.state-handler.aud}") String tokenAudience,
                                   @Value("${ddap.state-handler.ttl}") Duration tokenTtl,
                                   @Value("${ddap.state-handler.signingKey}") String tokenSigningKeyBase64) {
        this.icClient = icClient;
        this.stateHandler = stateHandler;
        this.jwtHandler = new JwtHandler(tokenAudience,
                                         tokenTtl,
                                         Keys.hmacShaKeyFor(Base64.getMimeDecoder().decode(tokenSigningKeyBase64)));
    }

    public CommandLineLoginStartModel initiateCommandLineLogin(URI selfLinkToApi, String realm, String scope) {
        final String baseTokenUrl = selfLinkToApi.resolve("identity/token").toString();
        // TODO: Store in map to track login status
        final String cliSessionId = UUID.randomUUID().toString();
        final String stateToken = stateHandler.generateCommandLineLoginState(cliSessionId);

        final String fullTokenUrl = format("%s?user_agent=cli&wait=true", baseTokenUrl);
        final String fullLoginUrl = icClient.getAuthorizeUrl(realm,
                                                             stateToken,
                                                             scope,
                                                             selfLinkToApi.resolve("identity/token"),
                                                             null).toString();

        final String bearerToken = jwtHandler.createBuilder(JwtHandler.TokenKind.BEARER)
                                             .claim("cliSessionId", cliSessionId)
                                             .claim("tokenKind", "bearer")
                                             .compact();

        return new CommandLineLoginStartModel(fullLoginUrl, fullTokenUrl, bearerToken);
    }
}
