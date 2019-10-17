package com.dnastack.ddap.explore.beacon.client;

import lombok.Getter;

public class BeaconErrorException extends RuntimeException {

    @Getter
    private Integer status;
    public BeaconErrorException(Integer status, String message) {
        super(message);
        this.status = status;
    }

}
