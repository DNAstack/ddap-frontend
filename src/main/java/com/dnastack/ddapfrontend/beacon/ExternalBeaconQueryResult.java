package com.dnastack.ddapfrontend.beacon;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ExternalBeaconQueryResult {
    private String name, organization;
    private Boolean exists;
    private Map<String, Object> metadata = new HashMap<>();
    private Map<String, String> info = new HashMap<>();
}
