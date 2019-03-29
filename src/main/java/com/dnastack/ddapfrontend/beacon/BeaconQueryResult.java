package com.dnastack.ddapfrontend.beacon;

import lombok.Data;

@Data
public class BeaconQueryResult {
    private Boolean exists;
    private Object alleleRequest;
    private Object datasetAlleleResponses;
    private String error;
}
