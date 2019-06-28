package com.dnastack.ddapfrontend.client.beacon.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Data
public class BeaconQueryResult extends BeaconApiAlleleResponse {

    private BeaconInfo beaconInfo;
    private BeaconQueryError queryError;

}
