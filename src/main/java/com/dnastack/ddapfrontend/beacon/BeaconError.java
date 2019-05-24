package com.dnastack.ddapfrontend.beacon;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BeaconError {
    private Integer status;
    private String message;
}
