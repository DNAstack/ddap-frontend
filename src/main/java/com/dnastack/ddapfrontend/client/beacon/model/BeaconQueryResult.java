package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.Data;

@Data
public class BeaconQueryResult {

    private Boolean exists;
    private Object alleleRequest;
    private Object datasetAlleleResponses;
    private Error error;

    @Data
    public static class Error {
        Integer errorCode;
        String message;
    }
}
