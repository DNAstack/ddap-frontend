package com.dnastack.ddapfrontend.client.wes;

import com.dnastack.ddapfrontend.client.WebClientFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
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

    public Mono<Object> getJobs(URI wesServerUrl, String wesToken) {
        final UriTemplate template = new UriTemplate("/ga4gh/wes/v1/runs");
        final Map<String, Object> variables = new HashMap<>();

        return webClientFactory.getWebClient()
                .get()
                .uri(wesServerUrl.resolve(template.expand(variables)))
                .header(AUTHORIZATION, "Bearer " + wesToken)
                .retrieve()
                .bodyToMono(Object.class);
    }

}
