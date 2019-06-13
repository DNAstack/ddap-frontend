package com.dnastack.ddapfrontend.client;

import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.ic.ReactiveIdentityConcentratorClient;
import com.dnastack.ddapfrontend.model.AccountModel;
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
    private ReactiveDamClient reactiveDamClient;
    @Autowired
    private ReactiveIdentityConcentratorClient icClient;

    public Mono<List<AccountModel.Access>> determineAccessForUser(String realm, String damToken, String icToken) {
        Mono<AccountModel.Access> damAccessMono = determineDamAccess(realm, damToken);
        Mono<AccountModel.Access> icAccessMono = determineIcAccess(realm, icToken);

        return Flux.merge(damAccessMono, icAccessMono)
                .collectList();
    }

    private Mono<AccountModel.Access> determineDamAccess(String realm, String damToken) {
        AccountModel.Access damAccess = new AccountModel.Access();
        damAccess.setTarget("DAM");
        return reactiveDamClient.getConfig(realm, damToken)
                .doOnSuccessOrError((damConfig, throwable) -> {
                    if (throwable != null && !throwable.getMessage().contains("403")) {
                        log.warn("Unexpected exception", throwable);
                    }
                    damAccess.setIsAdmin(throwable == null);
                })
                .thenReturn(damAccess)
                .onErrorReturn(damAccess);
    }

    private Mono<AccountModel.Access> determineIcAccess(String realm, String icToken) {
        AccountModel.Access icAccess = new AccountModel.Access();
        icAccess.setTarget("IC");
        return icClient.getConfig(realm, icToken)
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
