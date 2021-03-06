package com.dnastack.ddap.common.controller;

import com.dnastack.ddap.common.util.http.UriUtil;
import com.dnastack.ddap.dam.admin.client.ReactiveAdminDamClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dam")
public class DamInfoController {

    private Map<String, ReactiveAdminDamClient> damClients;

    @Autowired
    public DamInfoController(Map<String, ReactiveAdminDamClient> damClients) {
        this.damClients = damClients;
    }

    @GetMapping
    public Mono<DamsInfo> getDamInfo(ServerHttpRequest request, @PathVariable String realm) {
        return Flux.fromStream(damClients.entrySet().stream())
                   .flatMap(e -> {
                       final String damId = e.getKey();
                       final ReactiveAdminDamClient damClient = e.getValue();
                       return damClient.getDamInfo()
                                       .map(damInfoResponse -> {

                                           final String url = UriUtil.selfLinkToDam(request, damId)
                                                                     .toString();
                                           final String label = Optional.ofNullable(damInfoResponse.getUiMap())
                                                                        .map(ui -> ui.get("label"))
                                                                        // If you use orElseGet here you will run into a compilation error on Java 11
                                                                        // Issue is not present using Java 12
                                                                        .orElse(damInfoResponse.getName());
                                           return new DamInfo(damId, label, url);
                                       });
                   })
                   .collect(Collectors.toMap(DamInfo::getId, Function.identity()))
                   .map(DamsInfo::new);
    }
}
