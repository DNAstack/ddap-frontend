package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.http.UriUtil;
import com.dnastack.ddapfrontend.model.DamInfo;
import com.dnastack.ddapfrontend.model.DamsInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dam")
public class DamInfoController {

    private final DamClientFactory damClientFactory;

    @Autowired
    public DamInfoController(DamClientFactory damClientFactory) {
        this.damClientFactory = damClientFactory;
    }

    @GetMapping
    public Mono<DamsInfo> getDamInfo(ServerHttpRequest request, @PathVariable String realm) {
        return Flux.fromStream(damClientFactory.allDamClients())
                   .flatMap(e -> {
                       final String damId = e.getKey();
                       final ReactiveDamClient damClient = e.getValue();
                       return damClient.getDamInfo()
                                       .map(damInfoResponse -> {
                                           final String url = UriUtil.selfLinkToDam(request, damId)
                                                                     .toString();
                                           final String label = damInfoResponse.getUi()
                                                                               .getOrDefault("label",
                                                                                             damInfoResponse.getName());
                                           return new DamInfo(damId, label, url);
                                       });
                   })
                   .collect(Collectors.toMap(DamInfo::getId, Function.identity()))
                   .map(DamsInfo::new);
    }
}
