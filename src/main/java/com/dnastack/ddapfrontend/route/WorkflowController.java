package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.model.workflow.WesResourceViews;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunModel;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunRequestModel;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunsResponseModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.service.WesResourceService;
import com.dnastack.ddapfrontend.service.WesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/wes")
public class WorkflowController {

    private UserTokenCookiePackager cookiePackager;
    private WesResourceService wesResourceService;
    private WesService wesService;

    private Supplier<Stream<Map.Entry<String, ReactiveDamClient>>> damClients;

    @Autowired
    public WorkflowController(UserTokenCookiePackager cookiePackager,
                              DamClientFactory damClientFactory,
                              WesResourceService wesResourceService,
                              WesService wesService) {
        this.cookiePackager = cookiePackager;
        this.wesResourceService = wesResourceService;
        this.wesService = wesService;
        this.damClients = damClientFactory::allDamClients;
    }

    @GetMapping(value = "/views")
    public Flux<WesResourceViews> getWesResources(@PathVariable String realm) {
        return Flux.merge(damClients.get()
                .map(damClient -> wesResourceService.getResources(damClient, realm))
                .collect(toList())
        );
    }

    @GetMapping(value = "/runs")
    public Flux<WorkflowExecutionRunsResponseModel> getWorkflowRuns(ServerHttpRequest request, @PathVariable String realm) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        return Flux.merge(damClients.get()
                .map(damClient -> wesService.getAllWorkflowRuns(damClient, realm, damToken, refreshToken))
                .collect(toList())
        );
    }

    @PostMapping(value = "/{damId}/views/{viewId}/runs")
    public Mono<WorkflowExecutionRunModel> addWorkflowToRun(ServerHttpRequest request,
                                                            @PathVariable String realm,
                                                            @PathVariable String damId,
                                                            @PathVariable String viewId,
                                                            @RequestBody WorkflowExecutionRunRequestModel runRequest) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        Map.Entry<String, ReactiveDamClient> damClient = damClients.get()
                .filter(damClientEntry -> damClientEntry.getKey().equals(damId))
                .findFirst()
                .get();
        return wesService.executeWorkflow(damClient, realm, damToken, refreshToken, viewId, runRequest);
    }

}
