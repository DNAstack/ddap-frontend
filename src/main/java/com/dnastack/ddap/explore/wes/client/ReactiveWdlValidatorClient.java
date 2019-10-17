package com.dnastack.ddap.explore.wes.client;

import com.dnastack.ddap.common.client.WebClientFactory;
import com.dnastack.ddap.explore.wes.client.model.WdlDescribeDependencyRequestModel;
import com.dnastack.ddap.explore.wes.client.model.WdlDescribeRequestModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@Component
public class ReactiveWdlValidatorClient {

    private URI wdlValidatorUrl;
    private String wdlValidatorToken;
    private WebClientFactory webClientFactory;

    public ReactiveWdlValidatorClient(@Value("${ddap.wdl-validator.url}") URI wdlValidatorUrl,
                                      @Value("${ddap.wdl-validator.token}") String wdlValidatorToken,
                                      WebClientFactory webClientFactory) {
        this.wdlValidatorUrl = wdlValidatorUrl;
        this.wdlValidatorToken = wdlValidatorToken;
        this.webClientFactory = webClientFactory;
    }

    public Mono<Object> getJsonSchema(String wdl) {
        final UriTemplate template = new UriTemplate("/wdl/v1/describe");
        final Map<String, Object> variables = new HashMap<>();

        WdlDescribeRequestModel request = WdlDescribeRequestModel.builder()
                .uri("workflow.wdl")
                .dependencies(Collections.singletonList(WdlDescribeDependencyRequestModel.builder()
                        .uri("workflow.wdl")
                        .content(wdl)
                        .build()))
                .build();
        return webClientFactory.getWebClient()
                .post()
                .uri(wdlValidatorUrl.resolve(template.expand(variables)))
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .header(AUTHORIZATION, "Bearer " + wdlValidatorToken)
                .body(BodyInserters.fromObject(request))
                .retrieve()
                .bodyToMono(Object.class);
    }
    
}
