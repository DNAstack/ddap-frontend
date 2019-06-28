package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.Data;

import java.util.List;

@Data
public class BeaconApiAlleleResponse {

    private String beaconId;
    private String apiVersion;
    private Boolean exists;
    private BeaconApiAlleleRequest alleleRequest;
    private List<BeaconApiDatasetAlleleResponse> datasetAlleleResponses;
    private BeaconApiError error;

}
