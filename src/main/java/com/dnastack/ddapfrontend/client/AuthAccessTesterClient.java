package com.dnastack.ddapfrontend.client;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.ic.ReactiveIcClient;
import com.dnastack.ddapfrontend.model.IdentityModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

import static com.dnastack.ddapfrontend.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@Component
public class AuthAccessTesterClient {

    @Autowired
    private DamClientFactory damClientFactory;
    @Autowired
    private ReactiveIcClient icClient;

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
