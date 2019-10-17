package com.dnastack.ddap.explore.beacon.model;

import lombok.Data;

@Data
public class BeaconRequestModel {

    String assemblyId;
    String referenceName;
    String start;
    String referenceBases;
    String alternateBases;

}
