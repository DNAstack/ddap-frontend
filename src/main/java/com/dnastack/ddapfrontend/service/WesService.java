package com.dnastack.ddapfrontend.service;

import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.wes.ReactiveWesClient;
import com.dnastack.ddapfrontend.model.workflow.WesResourceViews;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunModel;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunRequestModel;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunsResponseModel;
import dam.v1.DamService;
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
import java.util.Map;

import static dam.v1.DamService.Resource;
import static dam.v1.DamService.View;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

@Slf4j
@Component
public class WesService {

    private WesResourceService wesResourceService;
    private ReactiveWesClient wesClient;

    @Autowired
    public WesService(WesResourceService wesResourceService, ReactiveWesClient wesClient) {
        this.wesResourceService = wesResourceService;
        this.wesClient = wesClient;
    }

    public Mono<WorkflowExecutionRunsResponseModel> getAllWorkflowRunsFromWesServer(Map.Entry<String, ReactiveDamClient> damClient,
                                                                                    String realm,
                                                                                    String damToken,
                                                                                    String refreshToken,
                                                                                    String viewId,
                                                                                    String nextPage) {
        return wesView(damClient, realm, viewId)
                .flatMap(wesResourceViews -> {
                    Map.Entry<String, DamService.View> view = wesResourceService.getViewById(wesResourceViews, viewId);
                    return getAllWorkflowRunsFromWesServer(damClient, realm, damToken, refreshToken, view, wesResourceViews.getResource(), nextPage);
                });
    }

    private Mono<WorkflowExecutionRunsResponseModel> getAllWorkflowRunsFromWesServer(Map.Entry<String, ReactiveDamClient> damClient,
                                                                                     String realm,
                                                                                     String damToken,
                                                                                     String refreshToken,
                                                                                     Map.Entry<String, View> view,
                                                                                     Map.Entry<String, Resource> resource,
                                                                                     String nextPage) {
        return damClient.getValue()
                .getAccessTokenForView(realm, resource.getKey(), view.getKey(), damToken, refreshToken)
                .flatMap((tokenResponse) -> {
                    URI wesServerUri = wesResourceService.getWesServerUri(view.getValue());
                    return wesClient.getRuns(wesServerUri, tokenResponse.getToken(), nextPage);
                })
                .doOnSuccess((runsResponse) -> setWorkflowRunMetadata(damClient.getKey(), view, resource, runsResponse))
                .onErrorResume(throwable -> {
                    log.error("Failed to load workflow runs with error", throwable);
                    return Mono.just(buildWorkflowRunMetadata(throwable, view, resource));
                });
    }

    private void setWorkflowRunMetadata(String damId,
                                        Map.Entry<String, View> view,
                                        Map.Entry<String, Resource> resource,
                                        WorkflowExecutionRunsResponseModel runsResponse) {
        WorkflowExecutionRunsResponseModel.WorkflowUi ui = new WorkflowExecutionRunsResponseModel.WorkflowUi();
        ui.setResource(resource.getValue().getUiOrDefault("label", resource.getKey()));
        ui.setView(view.getValue().getUiOrDefault("label", view.getKey()));
        runsResponse.setDamId(damId);
        runsResponse.setResourceId(resource.getKey());
        runsResponse.setViewId(view.getKey());
        runsResponse.setUi(ui);
    }

    private WorkflowExecutionRunsResponseModel buildWorkflowRunMetadata(Throwable throwable,
                                                                        Map.Entry<String, View> view,
                                                                        Map.Entry<String, Resource> resource) {
        WorkflowExecutionRunsResponseModel.WorkflowUi ui = new WorkflowExecutionRunsResponseModel.WorkflowUi();
        ui.setResource(resource.getValue().getUiOrDefault("label", resource.getKey()));
        ui.setView(view.getValue().getUiOrDefault("label", view.getKey()));
        WorkflowExecutionRunsResponseModel runsResponse = new WorkflowExecutionRunsResponseModel();
        WorkflowExecutionRunsResponseModel.WorkflowRequestError error = new WorkflowExecutionRunsResponseModel.WorkflowRequestError();
        error.setMessage(throwable.getMessage());
        runsResponse.setError(error);
        runsResponse.setUi(ui);
        return runsResponse;
    }

    public Mono<WorkflowExecutionRunModel> executeWorkflow(Map.Entry<String, ReactiveDamClient> damClient,
                                                           String realm,
                                                           String damToken,
                                                           String refreshToken,
                                                           String viewId,
                                                           WorkflowExecutionRunRequestModel runRequest) {
        return wesView(damClient, realm, viewId)
                .flatMap(wesResourceViews -> executeWorkflow(damClient, realm, damToken, refreshToken, viewId, runRequest, wesResourceViews));
    }

    private Mono<WesResourceViews> wesView(Map.Entry<String, ReactiveDamClient> damClient,
                                           String realm,
                                           String viewId) {
        Flux<WesResourceViews> wesResources = wesResourceService.getResources(damClient, realm);
        return wesResources
                .filter(wesResourceViews -> wesResourceViews.getViews().stream()
                        .anyMatch(stringViewEntry -> stringViewEntry.getKey().equals(viewId)))
                .single();
    }

    public Mono<WorkflowExecutionRunModel> getWorkflowRunDetails(Map.Entry<String, ReactiveDamClient> damClient,
                                                                          String realm,
                                                                          String damToken,
                                                                          String refreshToken,
                                                                          String viewId,
                                                                          String runId) {
        return wesView(damClient, realm, viewId)
                .flatMap(wesResourceViews -> workflowRunDetails(damClient, realm, damToken, refreshToken, viewId, runId, wesResourceViews));
    }

    private Mono<WorkflowExecutionRunModel> workflowRunDetails(Map.Entry<String, ReactiveDamClient> damClient,
                                                               String realm,
                                                               String damToken,
                                                               String refreshToken,
                                                               String viewId,
                                                               String runId,
                                                               WesResourceViews wesResourceViews) {
        Map.Entry<String, DamService.View> view = wesResourceService.getViewById(wesResourceViews, viewId);
        return damClient.getValue().getAccessTokenForView(realm, wesResourceViews.getResource().getKey(), view.getKey(), damToken, refreshToken)
                .flatMap((tokenResponse) -> {
                    URI wesServerUri = wesResourceService.getWesServerUri(view.getValue());
                    return wesClient.getRun(wesServerUri, tokenResponse.getToken(), runId);
                });
    }

    private Mono<WorkflowExecutionRunModel> executeWorkflow(Map.Entry<String, ReactiveDamClient> damClient,
                                                            String realm,
                                                            String damToken,
                                                            String refreshToken,
                                                            String viewId,
                                                            WorkflowExecutionRunRequestModel runRequest,
                                                            WesResourceViews wesResourceViews) {
        Map.Entry<String, DamService.View> view = wesResourceService.getViewById(wesResourceViews, viewId);
        return damClient.getValue().getAccessTokenForView(realm, wesResourceViews.getResource().getKey(), view.getKey(), damToken, refreshToken)
                .flatMap((tokenResponse) -> {
                    URI wesServerUri = wesResourceService.getWesServerUri(view.getValue());
                    return wesClient.addRun(wesServerUri, tokenResponse.getToken(), getMultipartBody(runRequest));
                });
    }

    private MultiValueMap<String, HttpEntity<?>> getMultipartBody(WorkflowExecutionRunRequestModel runRequest) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("workflow_url", "workflow.wdl")
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_url\"");
        builder.part("workflow_params", runRequest.getInputsJson(), MediaType.APPLICATION_JSON_UTF8)
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_params\"; filename=\"inputs.json\"");
        builder.part("workflow_attachment", runRequest.getWdl(), MediaType.TEXT_PLAIN)
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_attachment\"; filename=\"workflow.wdl\"");
        builder.part("workflow_attachment", runRequest.getTokensJson(), MediaType.APPLICATION_JSON_UTF8)
                .header(CONTENT_DISPOSITION, "form-data; name=\"workflow_attachment\"; filename=\"tokens.json\"");
        return builder.build();
    }

}
