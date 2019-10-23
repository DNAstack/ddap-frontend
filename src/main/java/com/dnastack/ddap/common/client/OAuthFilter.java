package com.dnastack.ddap.common.client;

import com.dnastack.ddap.ic.oauth.model.TokenResponse;
import com.dnastack.ddap.ic.oauth.client.ReactiveOAuthClient;
import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import reactor.core.publisher.Mono;

import java.util.function.Function;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
@Component
public class OAuthFilter {

    private ReactiveOAuthClient oAuthClient;
    private UserTokenCookiePackager cookiePackager;

    @Autowired
    public OAuthFilter(ReactiveOAuthClient oAuthClient, UserTokenCookiePackager cookiePackager) {
        this.oAuthClient = oAuthClient;
        this.cookiePackager = cookiePackager;
    }

    /**
     * Failed requests due 401 are retried with refresh access token iff refresh token is provided
     *
     */
    public ExchangeFilterFunction refreshAccessTokenFilter(String realm, String refreshToken, Audience audience) {
        return (request, next) -> next.exchange(request)
                .flatMap((Function<ClientResponse, Mono<ClientResponse>>) clientResponse -> {
                    if (clientResponse.statusCode().value() != 401 || refreshToken == null) {
                        return Mono.just(clientResponse);
                    }
                    return oAuthClient.refreshAccessToken(realm, refreshToken).flatMap(token -> {
                        ClientRequest retryRequest = ClientRequest.from(request)
                                .headers(h -> h.setBearerAuth(audience.getToken(token)))
                                .build();
                        return next.exchange(retryRequest).map(retryResponse -> {
                            return ClientResponse.from(retryResponse)
                                    // TODO: DISCO-2311 find out how to propagate Set-Cookie to endpoint
                                    .header(SET_COOKIE, cookiePackager.packageToken(token.getAccessToken(), UserTokenCookiePackager.CookieKind.IC).toString())
                                    .header(SET_COOKIE, cookiePackager.packageToken(token.getIdToken(), UserTokenCookiePackager.CookieKind.DAM).toString())
                                    .build();
                        });
                    });
                });
    }

    public enum Audience {
        IC,
        DAM;

        String getToken(TokenResponse token) {
            switch (this.name()) {
                case "IC": return token.getAccessToken();
                case "DAM": return token.getIdToken();
                default: return null;
            }
        }
    }

}
