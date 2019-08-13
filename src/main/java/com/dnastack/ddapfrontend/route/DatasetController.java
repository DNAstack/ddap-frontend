package com.dnastack.ddapfrontend.route;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.lang.String.format;

@RestController
@RequestMapping("/api/v1alpha/{realm}/dataset")
public class DatasetController {
    @GetMapping(params = "dataset_url")
    public Dataset fetchDataset(@RequestParam("dataset_url") String datasetUrl) {
        final Dataset dataset = new Dataset();

        final Schema schema = new Schema();
        final Map<String, PropertyDescription> properties = new LinkedHashMap<>();
        properties.put("id", new PropertyDescription("id of a resource", "string"));
        properties.put("url", new PropertyDescription("a url of a resource", "string"));
        properties.put("label", new PropertyDescription("name of a resource", "string"));
        schema.setProperties(properties);

        final List<Map<String, Object>> objects = new ArrayList<>();

        dataset.setObjects(objects);
        dataset.setSchema(schema);

        for (int i = 0; i < 100; i++) {
            Map<String, Object> object = new LinkedHashMap<>();
            object.put("url", format("drs://thousand-genomes-objects/%d", i+1));
            object.put("id", Integer.toString(i+1));
            object.put("Label", format("Thousand Genomes %d", i+1));
            objects.add(object);
        }

        return dataset;
    }

    @Data
    private class Dataset {
        private Schema schema;
        private List<Map<String, Object>> objects;
    }

    @Data
    private class Schema {
        private Map<String, PropertyDescription> properties;
    }

    @AllArgsConstructor
    @Data
    private class PropertyDescription {
        private String description;
        private String type;
    }
}
