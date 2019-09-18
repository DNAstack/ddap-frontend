package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.wes.ReactiveWdlValidatorClient;
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

    private ReactiveWdlValidatorClient wdlValidatorClient;
    private Supplier<Stream<Map.Entry<String, ReactiveDamClient>>> damClients;

    @Autowired
    public WorkflowController(UserTokenCookiePackager cookiePackager,
                              ReactiveWdlValidatorClient wdlValidatorClient,
                              DamClientFactory damClientFactory,
                              WesResourceService wesResourceService,
                              WesService wesService) {
        this.cookiePackager = cookiePackager;
        this.wdlValidatorClient = wdlValidatorClient;
        this.wesResourceService = wesResourceService;
        this.wesService = wesService;
        this.damClients = damClientFactory::allDamClients;
    }

    @PostMapping(value = "/describe")
    public Mono<Object> getJsonSchemaFromWdl(@PathVariable String realm, @RequestBody String wdl) {
        return wdlValidatorClient.getJsonSchema(wdl);
    }

    @GetMapping(value = "/views")
    public Flux<WesResourceViews> getWesResources(@PathVariable String realm) {
        return Flux.merge(damClients.get()
                .map(damClient -> wesResourceService.getResources(damClient, realm))
                .collect(toList())
        );
    }

    @GetMapping(value = "/{damId}/views/{viewId}/runs")
    public Mono<WorkflowExecutionRunsResponseModel> getWorkflowRuns(ServerHttpRequest request,
                                                                    @PathVariable String realm,
                                                                    @PathVariable String damId,
                                                                    @PathVariable String viewId,
                                                                    @RequestParam(required = false) String nextPage) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        Map.Entry<String, ReactiveDamClient> damClient = damClients.get()
                .filter(damClientEntry -> damClientEntry.getKey().equals(damId))
                .findFirst()
                .get();
        return wesService.getAllWorkflowRunsFromWesServer(damClient, realm, damToken, refreshToken, viewId, nextPage);
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

    @GetMapping(value = "/{damId}/views/{viewId}/runs/{runId}")
    public Mono<WorkflowExecutionRunModel> getWorkflowRunDetails(ServerHttpRequest request,
                                                                          @PathVariable String realm,
                                                                          @PathVariable String damId,
                                                                          @PathVariable String viewId,
                                                                          @PathVariable String runId) {

        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken.orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        Map.Entry<String, ReactiveDamClient> damClient = damClients.get()
                .filter(damClientEntry -> damClientEntry.getKey().equals(damId))
                .findFirst()
                .get();
        return wesService.getWorkflowRunDetails(damClient, realm, damToken, refreshToken, viewId, runId);
    }

}
