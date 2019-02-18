package com.dnastack.ddapfrontend.model;

import lombok.Data;

@Data
public class BeaconRequestModel {

    String assemblyId;
    String referenceName;
    String start;
    String referenceBases;
    String alternateBases;

}
