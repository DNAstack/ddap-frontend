package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.config.Dam;
import com.dnastack.ddapfrontend.http.UriUtil;
import com.dnastack.ddapfrontend.model.DamInfo;
import com.dnastack.ddapfrontend.model.DamsInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Collections.unmodifiableMap;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dam")
public class DamInfoController {

    private final Map<String, Dam> dams;

    @Autowired
    public DamInfoController(@Qualifier("dams") Map<String, Dam> dams) {
        this.dams = unmodifiableMap(dams);
    }

    @GetMapping
    public Mono<DamsInfo> getDamInfo(ServerHttpRequest request, @PathVariable String realm) {
        final Map<String, DamInfo> damInfoById =
                dams.keySet()
                    .stream()
                    .map(damId -> {
                        final String url = UriUtil.selfLinkToDam(request, damId)
                                                  .toString();
                        return Map.entry(damId, new DamInfo(url));
                    })
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        return Mono.just(new DamsInfo(damInfoById));
    }
}
