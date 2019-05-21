package com.dnastack.ddapfrontend.beacon;

import lombok.Data;

@Data
public class BeaconInfoReceived {
    private String name;
    private String error;
    private BeaconOrganization organization;
}
