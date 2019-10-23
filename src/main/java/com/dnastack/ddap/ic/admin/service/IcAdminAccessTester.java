package com.dnastack.ddap.ic.admin.service;

import com.dnastack.ddap.ic.admin.client.ReactiveAdminIcClient;
import com.dnastack.ddap.ic.admin.model.UserAccess;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Map;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@Component
public class IcAdminAccessTester {

    private ReactiveAdminIcClient icClient;

    @Autowired
    public IcAdminAccessTester(ReactiveAdminIcClient icClient) {
        this.icClient = icClient;
    }

    public Mono<UserAccess> determineAccessForUser(String realm, Map<CookieKind, String> tokens) {
        UserAccess access = new UserAccess();

        return icClient.getConfig(realm, tokens.get(CookieKind.IC), tokens.get(CookieKind.REFRESH))
            .doOnSuccessOrError((icConfig, throwable) -> {
                if (throwable != null && !throwable.getMessage().contains("403")) {
                    log.warn("Unexpected exception", throwable);
                }
                access.setIsAdmin(throwable == null);
            })
            .thenReturn(access)
            .onErrorReturn(access);
    }

}
