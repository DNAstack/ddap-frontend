package com.dnastack.ddap.dam.admin.client;

import com.dnastack.ddap.ic.account.controller.model.IdentityModel;
import com.dnastack.ddap.ic.admin.client.ReactiveAdminIcClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@Component
public class AuthAccessTesterClient {

    @Autowired
    private DamClientFactory damClientFactory;
    @Autowired
    private ReactiveAdminIcClient icClient;

    public Mono<List<IdentityModel.Access>> determineAccessForUser(String realm, Map<CookieKind, String> tokens) {

        final Flux<IdentityModel.Access> damAccessFlux =
                damClientFactory.allDamClients()
                        .map(idClientEntry -> determineDamAccess(idClientEntry.getKey(),
                                idClientEntry.getValue(),
                                realm,
                                tokens))
                        .reduce(Flux.empty(), (accum, mono) -> Flux.merge(accum, mono), Flux::merge);
        final Mono<IdentityModel.Access> icAccessMono = determineIcAccess(realm, tokens);

        return Flux.merge(damAccessFlux, icAccessMono)
                   .collectList();
    }

    private Mono<IdentityModel.Access> determineDamAccess(String damId, ReactiveDamClient damClient, String realm, Map<CookieKind, String> tokens) {
        IdentityModel.Access damAccess = new IdentityModel.Access();
        damAccess.setTarget(new IdentityModel.Target(IdentityModel.Service.DAM, damId));
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

    // TODO: refactor to decouple with IC
    private Mono<IdentityModel.Access> determineIcAccess(String realm, Map<CookieKind, String> tokens) {
        IdentityModel.Access icAccess = new IdentityModel.Access();
        icAccess.setTarget(new IdentityModel.Target(IdentityModel.Service.IC, null));
        return icClient.getConfig(realm, tokens.get(CookieKind.IC), tokens.get(CookieKind.REFRESH))
                .doOnSuccessOrError((icConfig, throwable) -> {
                    if (throwable != null && !throwable.getMessage().contains("403")) {
                        log.warn("Unexpected exception", throwable);
                    }
                    icAccess.setIsAdmin(throwable == null);
                })
                .thenReturn(icAccess)
                .onErrorReturn(icAccess);
    }

}
