package com.dnastack.ddapfrontend.beacon;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class BeaconQueryResult {
    private BeaconInfo beaconInfo;
    private BeaconError error;
    private Boolean exists;
    private Map<String, Object> metadata = new HashMap<>();
    private Map<String, String> info = new HashMap<>();
}
