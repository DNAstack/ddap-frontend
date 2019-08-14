package com.dnastack.ddapfrontend.client.dataset.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schema {

    @JsonProperty("$ref")
    private String ref;

    private Map<String, Object> properties;

}
