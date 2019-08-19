package com.dnastack.ddapfrontend.model;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlatView {

    private String resourcePath;
    private String umbrella;
    private String resourceName;
    private String viewName;
    private String roleName;
    private String interfaceName;
    private String interfaceUri;
    private String contentType;
    private String version;
    private String topic;
    private String partition;
    private String fidelity;
    private String geoLocation;
    private String targetAdapter;
    private String platform;
    private String platformService;
    private String maxTokenTtl;
    private Map<String, String> resourceUi;
    private Map<String, String> viewUi;


}

