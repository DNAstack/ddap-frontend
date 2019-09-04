package com.dnastack.ddapfrontend.service;

import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.wes.ReactiveWesClient;
import com.dnastack.ddapfrontend.model.workflow.WesResourceViews;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunRequestModel;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunsResponseModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
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
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

@Slf4j
@Component
public class WesService {

    private static final String WES_SERVICE_DEFINITION = "wes";

    private ObjectMapper objectMapper;
    private ReactiveWesClient wesClient;

    @Autowired
    public WesService(ObjectMapper objectMapper, ReactiveWesClient wesClient) {
        this.objectMapper = objectMapper;
        this.wesClient = wesClient;
    }

    public Flux<WorkflowExecutionRunsResponseModel> getAllWorkflowRuns(Map.Entry<String, ReactiveDamClient> damClient,
                                                                       String realm,
                                                                       String damToken,
                                                                       String refreshToken) {
        Flux<WesResourceViews> wesResources = getResourcesWithWesViews(damClient, realm, damToken, refreshToken);
        return wesResources.flatMap(wesResourceViews -> Flux.fromIterable(
                wesResourceViews.getViews()
                        .stream()
                        .map((view) -> getAllWorkflowRunsFromWesServer(damClient.getValue(), realm, damToken, refreshToken, view, wesResourceViews.getResource()))
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
                .flatMap((tokenResponse) -> wesClient.getRuns(getWesServerUri(view.getValue()), tokenResponse.getToken()))
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

    public Flux<WesResourceViews> getResourcesWithWesViews(Map.Entry<String, ReactiveDamClient> damClient,
                                                           String realm,
                                                           String damToken,
                                                           String refreshToken) {
        return damClient.getValue().getConfig(realm, damToken, refreshToken)
                .map(DamConfig::getResourcesMap)
                .map(Map::entrySet)
                .map(Collection::stream)
                .map(resources -> getResourcesWithWesViews(damClient.getKey(), resources))
                .flatMapMany(Flux::fromIterable);
    }

    private List<WesResourceViews> getResourcesWithWesViews(String damId, Stream<Map.Entry<String, Resource>> resources) {
        return resources
                .filter(this::hasWesViews)
                .map(resource -> buildWesResource(damId, resource))
                .collect(Collectors.toList());
    }

    private boolean hasWesViews(Map.Entry<String, Resource> resource) {
        return resource.getValue()
                .getViewsMap()
                .entrySet()
                .stream()
                .anyMatch(view -> view.getValue().getServiceTemplate().equals(WES_SERVICE_DEFINITION));
    }

    private WesResourceViews buildWesResource(String damId, Map.Entry<String, Resource> resource) {
        WesResourceViews wesResourceViews = new WesResourceViews();
        wesResourceViews.setDamId(damId);
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

    public Mono<Object> executeWorkflow(Map.Entry<String, ReactiveDamClient> damClient,
                                  String realm,
                                  String damToken,
                                  String refreshToken,
                                  WorkflowExecutionRunRequestModel runRequest) {
        Flux<WesResourceViews> wesResources = getResourcesWithWesViews(damClient, realm, damToken, refreshToken);
        return wesResources
                .filter(wesResourceViews -> wesResourceViews.getViews().stream()
                        .anyMatch(stringViewEntry -> stringViewEntry.getKey().equals(runRequest.getView()))
                )
                .single()
                .flatMap(wesResourceViews -> {
                    Map.Entry<String, View> view = wesResourceViews.getViews().stream()
                            .filter(stringViewEntry -> stringViewEntry.getKey().equals(runRequest.getView()))
                            .findFirst()
                            .get();
                    return damClient.getValue().getAccessTokenForView(realm, wesResourceViews.getResource().getKey(), view.getKey(), damToken, refreshToken)
                            .flatMap((tokenResponse) -> wesClient.addRun(getWesServerUri(view.getValue()), tokenResponse.getToken(), getMultipartBody(runRequest)));
                });
    }

    // TODO: Add support for `tokens.json`
    private MultiValueMap<String, HttpEntity<?>> getMultipartBody(WorkflowExecutionRunRequestModel runRequest) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("workflow_url", "workflow.wdl")
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_url\"");
        builder.part("workflow_attachment", runRequest.getWdlJson(), MediaType.TEXT_PLAIN)
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_attachment\"; filename=\"workflow.wdl\"");
        builder.part("workflow_params", runRequest.getInputsJson(), MediaType.APPLICATION_JSON_UTF8)
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_params\"; filename=\"inputs.json\"");
        return builder.build();
    }

}
