package com.dnastack.ddapfrontend.beacon;

import lombok.Data;

@Data
public class BeaconInfo {
    private String name;
    private String error;
    private BeaconOrganization organization;
}
