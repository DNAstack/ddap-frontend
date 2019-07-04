package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BeaconInfo {

    private String name;
    private String resourceLabel;
    private String damId;
    private String resourceId;
    private String viewId;

}
