package com.dnastack.ddap.dam.admin.controller;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.dam.admin.client.DamAdminClientFactory;
import com.dnastack.ddap.dam.admin.client.ReactiveAdminDamClient;
import dam.v1.DamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Set;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.*;

@RestController
@RequestMapping(value = "/api/v1alpha/{realm}/dam/{damId}/target-adapters")
public class TargetAdapterController {

    private UserTokenCookiePackager cookiePackager;
    private DamAdminClientFactory damClientFactory;

    @Autowired
    public TargetAdapterController(UserTokenCookiePackager cookiePackager,
                                   DamAdminClientFactory damClientFactory) {
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
    }

    @GetMapping
    public Mono<Map<String, DamService.TargetAdapter>> getTargetAdapters(@PathVariable String realm,
                                                                         @PathVariable String damId,
                                                                         ServerHttpRequest request) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));
        ReactiveAdminDamClient damClient = damClientFactory.getDamClient(damId);

        return damClient.getTargetAdapters(realm, tokens.get(CookieKind.DAM), tokens.get(CookieKind.REFRESH))
            .map(DamService.TargetAdaptersResponse::getTargetAdaptersMap);
    }

}
