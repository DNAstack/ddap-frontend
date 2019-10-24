package com.dnastack.ddap.dam.admin.service;

import com.dnastack.ddap.dam.admin.client.DamAdminClientFactory;
import com.dnastack.ddap.dam.admin.client.ReactiveAdminDamClient;
import com.dnastack.ddap.dam.admin.model.UserAccess;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Map;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@Component
public class DamAdminAccessTester {

    private DamAdminClientFactory damClientFactory;

    @Autowired
    public DamAdminAccessTester(DamAdminClientFactory damClientFactory) {
        this.damClientFactory = damClientFactory;
    }

    public Mono<UserAccess> determineAccessForUser(String realm, String damId, Map<CookieKind, String> tokens) {
        return determineDamAccess(realm, damId, damClientFactory.getDamClient(damId), tokens);
    }

    private Mono<UserAccess> determineDamAccess(String realm, String damId, ReactiveAdminDamClient damClient, Map<CookieKind, String> tokens) {
        UserAccess damAccess = new UserAccess();
        damAccess.setDamId(damId);

        return damClient.getConfig(realm, tokens.get(CookieKind.DAM), tokens.get(CookieKind.REFRESH))
            .doOnSuccessOrError((damConfig, throwable) -> {
                if (throwable != null && !throwable.getMessage().contains("403")) {
                    log.warn("Unexpected exception", throwable);
                }
                damAccess.setIsAdmin(throwable == null);
            })
            .thenReturn(damAccess)
            .onErrorReturn(damAccess);
    }

}
