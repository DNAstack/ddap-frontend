package com.dnastack.ddapfrontend.client.wes;

import com.dnastack.ddapfrontend.client.WebClientFactory;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunModel;
import com.dnastack.ddapfrontend.model.workflow.WorkflowExecutionRunsResponseModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class ReactiveWesClient {

    private WebClientFactory webClientFactory;

    public ReactiveWesClient(WebClientFactory webClientFactory) {
        this.webClientFactory = webClientFactory;
    }

    public Mono<WorkflowExecutionRunsResponseModel> getRuns(URI wesServerUrl, String wesToken, String nextPage) {
        final UriTemplate template = new UriTemplate("/ga4gh/wes/v1/runs?page_token=" + nextPage);
        final Map<String, Object> variables = new HashMap<>();

        return webClientFactory.getWebClient()
                .get()
                .uri(wesServerUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + wesToken)
                .retrieve()
                .bodyToMono(WorkflowExecutionRunsResponseModel.class);
    }

    public Mono<WorkflowExecutionRunModel> addRun(URI wesServerUrl, String wesToken, MultiValueMap<String, HttpEntity<?>> multipart) {
        final UriTemplate template = new UriTemplate("/ga4gh/wes/v1/runs?page_size=10");
        final Map<String, Object> variables = new HashMap<>();

        return webClientFactory.getWebClient()
                .post()
                .uri(wesServerUrl.resolve(template.expand(variables)))
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .header(AUTHORIZATION, "Bearer " + wesToken)
                .body(BodyInserters.fromMultipartData(multipart))
                .retrieve()
                .bodyToMono(WorkflowExecutionRunModel.class);
    }

    public Mono<WorkflowExecutionRunModel> getRun(URI wesServerUrl, String wesToken, String runId) {
        final UriTemplate template = new UriTemplate("/ga4gh/wes/v1/runs/{runId}");
        final Map<String, String> variables = new HashMap<>();
        variables.put("runId", runId);

        return webClientFactory.getWebClient()
                .get()
                .uri(wesServerUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + wesToken)
                .retrieve()
                .bodyToMono(WorkflowExecutionRunModel.class);
    }
    
}
