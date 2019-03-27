package com.dnastack.ddapfrontend.beacon;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExternalBeaconQueryResult {
    private String resource, name, organization;
    private String error;
    private Boolean exists;
    private Map<String, Object> metadata = new HashMap<>();
    private Map<String, String> info = new HashMap<>();
}
