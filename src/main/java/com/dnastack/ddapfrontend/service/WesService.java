package com.dnastack.ddapfrontend.service;

import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.wes.ReactiveWesClient;
import com.dnastack.ddapfrontend.model.workflow.WesResourceViews;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunsResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static dam.v1.DamService.*;
import static java.util.stream.Collectors.toList;

@Slf4j
@Component
public class WesService {

    private static final String WES_SERVICE_DEFINITION = "wes";

    private ReactiveWesClient wesClient;

    @Autowired
    public WesService(ReactiveWesClient wesClient) {
        this.wesClient = wesClient;
    }

    public Flux<WorkflowExecutionRunsResponseModel> getAllWorkflowRuns(ReactiveDamClient damClient,
                                                                       String realm,
                                                                       String damToken,
                                                                       String refreshToken) {
        Flux<WesResourceViews> wesResources = getResourcesWithWesViews(damClient, realm, damToken, refreshToken);
        return wesResources.flatMap(wesResourceViews -> Flux.fromIterable(
                wesResourceViews.getViews()
                        .stream()
                        .map((view) -> getAllWorkflowRunsFromWesServer(damClient, realm, damToken, refreshToken, view, wesResourceViews.getResource()))
                        .collect(toList())
        ).flatMap(Flux::merge));
    }

    private Mono<WorkflowExecutionRunsResponseModel> getAllWorkflowRunsFromWesServer(ReactiveDamClient damClient,
                                                                                     String realm,
                                                                                     String damToken,
                                                                                     String refreshToken,
                                                                                     Map.Entry<String, View> view,
                                                                                     Map.Entry<String, Resource> wesResource) {
        return damClient.getAccessTokenForView(realm, wesResource.getKey(), view.getKey(), damToken, refreshToken)
                .flatMap((tokenResponse) -> wesClient.getJobs(getWesServerUri(view.getValue()), tokenResponse.getToken()))
                .doOnSuccess((runsResponse) -> {
                    runsResponse.setUi(getWorkflowUi(view, wesResource));
                })
                .onErrorResume(throwable -> {
                    log.error("Failed to load workflow runs with error", throwable);
                    WorkflowExecutionRunsResponseModel response = new WorkflowExecutionRunsResponseModel();
                    WorkflowExecutionRunsResponseModel.WorkflowRequestError error = new WorkflowExecutionRunsResponseModel.WorkflowRequestError();
                    error.setMessage(throwable.getMessage());
                    response.setError(error);
                    response.setUi(getWorkflowUi(view, wesResource));
                    return Mono.just(response);
                });
    }

    private WorkflowExecutionRunsResponseModel.WorkflowUi getWorkflowUi(Map.Entry<String, View> view, Map.Entry<String, Resource> wesResource) {
        WorkflowExecutionRunsResponseModel.WorkflowUi ui = new WorkflowExecutionRunsResponseModel.WorkflowUi();
        ui.setResource(wesResource.getValue().getUiOrDefault("label", wesResource.getKey()));
        ui.setResourceId(wesResource.getKey());
        ui.setView(view.getValue().getUiOrDefault("label", view.getKey()));
        ui.setViewId(view.getKey());
        return ui;
    }

    public Flux<WesResourceViews> getResourcesWithWesViews(ReactiveDamClient damClient,
                                                           String realm,
                                                           String damToken,
                                                           String refreshToken) {
        return damClient.getConfig(realm, damToken, refreshToken)
                .map(DamConfig::getResourcesMap)
                .map(Map::entrySet)
                .map(Collection::stream)
                .map(this::getResourcesWithWesViews)
                .flatMapMany(Flux::fromIterable);
    }

    private List<WesResourceViews> getResourcesWithWesViews(Stream<Map.Entry<String, Resource>> resources) {
        return resources
                .filter(this::hasWesViews)
                .map(this::buildWesResource)
                .collect(Collectors.toList());
    }

    private boolean hasWesViews(Map.Entry<String, Resource> resource) {
        return resource.getValue()
                .getViewsMap()
                .entrySet()
                .stream()
                .anyMatch(view -> view.getValue().getServiceTemplate().equals(WES_SERVICE_DEFINITION));
    }

    private WesResourceViews buildWesResource(Map.Entry<String, Resource> resource) {
        WesResourceViews wesResourceViews = new WesResourceViews();
        wesResourceViews.setResource(resource);
        wesResourceViews.setViews(getWesViewsFrom(resource.getValue()));
        return wesResourceViews;
    }

    private List<Map.Entry<String, View>> getWesViewsFrom(Resource resource) {
        return resource.getViewsMap()
                .entrySet()
                .stream()
                .filter(view -> view.getValue().getServiceTemplate().equals(WES_SERVICE_DEFINITION))
                .collect(toList());
    }

    private URI getWesServerUri(View view) {
        return URI.create(view.getItemsList().stream()
                .map(item -> item.getVarsMap().get("url"))
                .findFirst()
                .get());
    }

}
