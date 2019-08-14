package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dataset.DatasetErrorException;
import com.dnastack.ddapfrontend.client.dataset.ReactiveDatasetClient;
import com.dnastack.ddapfrontend.client.dataset.model.DatasetResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dataset")
public class DatasetController {

    private final ReactiveDatasetClient datasetClient;

    @Autowired
    public DatasetController(ReactiveDatasetClient datasetClient) {
        this.datasetClient = datasetClient;
    }


    @GetMapping(params = "dataset_url")
    public Mono<DatasetResult> fetchDataset(@RequestParam("dataset_url") String datasetUrl) {
        return datasetClient.fetchSingleDataset(datasetUrl, null).onErrorResume(e -> {
            if (!DatasetErrorException.class.isAssignableFrom(e.getClass())) {
                throw new DatasetErrorException(500, e.getMessage());
            } else {
                throw (DatasetErrorException) e;
            }
        });
    }


}
