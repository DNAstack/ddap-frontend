package com.dnastack.ddap.dam.admin.service;

import com.dnastack.ddap.dam.admin.client.DamClientFactory;
import com.dnastack.ddap.dam.admin.client.ReactiveDamClient;
import com.dnastack.ddap.dam.admin.model.UserAccess;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@Component
public class DamAdminAccessTester {

    private Supplier<Stream<Map.Entry<String, ReactiveDamClient>>> damClients;

    @Autowired
    public DamAdminAccessTester(DamClientFactory damClientFactory) {
        this.damClients = damClientFactory::allDamClients;
    }

    public Mono<UserAccess> determineAccessForUser(String realm, String damId, Map<CookieKind, String> tokens) {
        Map.Entry<String, ReactiveDamClient> damClient = damClients.get()
            .filter(damClientEntry -> damClientEntry.getKey().equals(damId))
            .findFirst()
            .get();
        return determineDamAccess(realm, damId, damClient.getValue(), tokens);
    }

    private Mono<UserAccess> determineDamAccess(String realm, String damId, ReactiveDamClient damClient, Map<CookieKind, String> tokens) {
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
