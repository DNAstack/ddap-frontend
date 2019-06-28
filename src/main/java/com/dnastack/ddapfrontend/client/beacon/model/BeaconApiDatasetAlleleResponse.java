package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.Data;

import java.util.Map;

@Data
public class BeaconApiDatasetAlleleResponse {

    private String datasetId;
    private Boolean exists;
    private Long variantCount;
    private Long callCount;
    private Long sampleCount;
    private Double frequency;
    private String note;
    private String externalUrl;
    private Map<String, String> info;
    private BeaconApiError error;

}
