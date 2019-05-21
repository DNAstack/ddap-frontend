package com.dnastack.ddapfrontend.beacon;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExternalBeaconQueryResult {

    private Map<String, String> resource = new HashMap<>();
    private String name, organization;
    private String error;
    private Boolean exists;
    private Map<String, Object> metadata = new HashMap<>();
    private Map<String, String> info = new HashMap<>();

}
