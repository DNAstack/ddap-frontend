package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dataset.DatasetErrorException;
import com.dnastack.ddapfrontend.client.dataset.ReactiveDatasetClient;
import com.dnastack.ddapfrontend.client.dataset.model.DatasetResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping(path = "/views")
    public List<Map<String, Object>> fetchViews(@RequestBody List<String> urls) {
        final List<Map<String, Object>> views = new ArrayList<>();
        for(int i=0; i< urls.size(); i++) {
            Map<String, Object> view = new LinkedHashMap<>();
            List<String> resView = new ArrayList<>();
            resView.add("dam1/res1/view1");
            if(i%2 == 0){
                resView.add("dam2/res2/view1");
            }
            view.put(urls.get(i), resView);
            views.add(view);
        }
        return views;
    }


}
