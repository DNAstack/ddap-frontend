package com.dnastack.ddap.dam.admin.controller;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.dam.admin.model.UserAccess;
import com.dnastack.ddap.dam.admin.service.DamAdminAccessTester;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Set;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/dam")
public class DamAdminController {

    private UserTokenCookiePackager cookiePackager;
    private DamAdminAccessTester accessTesterClient;

    @Autowired
    public DamAdminController(UserTokenCookiePackager cookiePackager, DamAdminAccessTester accessTesterClient) {
        this.cookiePackager = cookiePackager;
        this.accessTesterClient = accessTesterClient;
    }

    @GetMapping(value = "/{damId}/access")
    public Mono<? extends ResponseEntity<?>> getAccess(ServerHttpRequest request,
                                                       @PathVariable String realm,
                                                       @PathVariable String damId) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.IC, CookieKind.DAM, CookieKind.REFRESH));

        Mono<UserAccess> accessesMono = accessTesterClient.determineAccessForUser(realm, damId, tokens);

        return accessesMono.flatMap(access -> Mono.just(ResponseEntity.ok().body(access)));
    }

}
