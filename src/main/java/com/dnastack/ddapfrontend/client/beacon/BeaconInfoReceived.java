package com.dnastack.ddapfrontend.client.beacon;

import lombok.Data;

@Data
public class BeaconInfoReceived {
    private String name;
    private String error;
    private BeaconOrganization organization;
}
