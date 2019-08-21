package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dataset.DatasetErrorException;
import com.dnastack.ddapfrontend.client.dataset.ReactiveDatasetClient;
import com.dnastack.ddapfrontend.client.dataset.model.DatasetResult;
import com.dnastack.ddapfrontend.model.FlatView;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriTemplate;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dataset")
public class DatasetController {

    private final ReactiveDatasetClient datasetClient;
    private final DamClientFactory damClientFactory;
    private final UserTokenCookiePackager cookiePackager;

    @Autowired
    public DatasetController(DamClientFactory damClientFactory, UserTokenCookiePackager cookiePackager,
        ReactiveDatasetClient datasetClient) {
        this.datasetClient = datasetClient;
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
    }


    @GetMapping(params = "dataset_url")
    public Mono<DatasetResult> fetchDataset(@RequestParam("dataset_url") String datasetUrl,
        @RequestParam(value = "access_token", required = false) String accessToken) {
        return datasetClient.fetchSingleDataset(datasetUrl, accessToken).onErrorResume(e -> {
            if (!DatasetErrorException.class.isAssignableFrom(e.getClass())) {
                throw new DatasetErrorException(500, e.getMessage());
            } else {
                throw (DatasetErrorException) e;
            }
        });
    }




}
