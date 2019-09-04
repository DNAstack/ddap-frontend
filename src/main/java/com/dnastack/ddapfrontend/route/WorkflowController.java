package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.model.workflow.WesResourceViews;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunsResponseModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.service.WesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/v1alpha/{realm}/wes")
public class WorkflowController {

    private UserTokenCookiePackager cookiePackager;
    private WesService wesService;

    private Supplier<Stream<Map.Entry<String, ReactiveDamClient>>> damClients;

    @Autowired
    public WorkflowController(UserTokenCookiePackager cookiePackager, DamClientFactory damClientFactory, WesService wesService) {
        this.cookiePackager = cookiePackager;
        this.wesService = wesService;

        this.damClients = damClientFactory::allDamClients;
    }

    @GetMapping(value = "/runs")
    public Flux<WorkflowExecutionRunsResponseModel> getWorkflowRuns(ServerHttpRequest request, @PathVariable String realm) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        return Flux.merge(damClients.get()
                .map(damClient -> wesService.getAllWorkflowRuns(damClient.getValue(), realm, damToken, refreshToken))
                .collect(toList())
        );
    }

    @GetMapping(value = "/views")
    public Flux<WesResourceViews> getWesResources(ServerHttpRequest request, @PathVariable String realm) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        return Flux.merge(damClients.get()
                .map(damClient -> wesService.getResourcesWithWesViews(damClient.getValue(), realm, damToken, refreshToken))
                .collect(toList())
        );
    }

}
