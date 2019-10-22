package com.dnastack.ddap.ic.account.service;

import com.dnastack.ddap.ic.account.client.ReactiveIcAccountClient;
import com.dnastack.ddap.ic.common.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Map;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Component
public class AccountLinkingService {

    private ReactiveIcAccountClient accountClient;

    @Autowired
    public AccountLinkingService(ReactiveIcAccountClient accountClient) {
        this.accountClient = accountClient;
    }

    public Mono<String> unlinkAccount(String realm, Map<CookieKind, String> tokens, String subjectName) {
        String accountId = JwtUtil.dangerousStopgapExtractSubject(tokens.get(CookieKind.IC)).map(JwtUtil.JwtSubject::getSub).orElse(null);

        return accountClient.unlinkAccount(realm, accountId, tokens.get(CookieKind.IC), tokens.get(CookieKind.REFRESH), subjectName);
    }

    public Mono<String> finishAccountLinking(String newAccountLinkToken,
                                             String baseAccountLinkToken,
                                             String realm,
                                             String refreshToken) {
        String newAccountId = JwtUtil.dangerousStopgapExtractSubject(newAccountLinkToken).map(JwtUtil.JwtSubject::getSub).orElse(null);
        String baseAccountId = JwtUtil.dangerousStopgapExtractSubject(baseAccountLinkToken).map(JwtUtil.JwtSubject::getSub).orElse(null);

        return accountClient.linkAccounts(realm, baseAccountId, baseAccountLinkToken, newAccountId, newAccountLinkToken, refreshToken);
    }

}
