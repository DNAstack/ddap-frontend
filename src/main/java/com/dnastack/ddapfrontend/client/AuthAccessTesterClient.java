package com.dnastack.ddapfrontend.client;

import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.ic.ReactiveIcClient;
import com.dnastack.ddapfrontend.model.IdentityModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@Component
public class AuthAccessTesterClient {

    @Autowired
    private ReactiveDamClient damClient;
    @Autowired
    private ReactiveIcClient icClient;

    public Mono<List<IdentityModel.Access>> determineAccessForUser(String realm, String damToken, String icToken, String refreshToken) {
        Mono<IdentityModel.Access> damAccessMono = determineDamAccess(realm, damToken, refreshToken);
        Mono<IdentityModel.Access> icAccessMono = determineIcAccess(realm, icToken, refreshToken);

        return Flux.merge(damAccessMono, icAccessMono)
                .collectList();
    }

    private Mono<IdentityModel.Access> determineDamAccess(String realm, String damToken, String refreshToken) {
        IdentityModel.Access damAccess = new IdentityModel.Access();
        damAccess.setTarget("DAM");
        return damClient.getConfig(realm, damToken, refreshToken)
                .doOnSuccessOrError((damConfig, throwable) -> {
                    if (throwable != null && !throwable.getMessage().contains("403")) {
                        log.warn("Unexpected exception", throwable);
                    }
                    damAccess.setIsAdmin(throwable == null);
                })
                .thenReturn(damAccess)
                .onErrorReturn(damAccess);
    }

    private Mono<IdentityModel.Access> determineIcAccess(String realm, String icToken, String refreshToken) {
        IdentityModel.Access icAccess = new IdentityModel.Access();
        icAccess.setTarget("IC");
        return icClient.getConfig(realm, icToken, refreshToken)
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
