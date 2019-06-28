package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BeaconApiError {

    private Integer errorCode;
    private String errorMessage;

}
