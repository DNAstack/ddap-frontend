package com.dnastack.ddap.explore.wes.client;

import lombok.Getter;

public class AccessErrorException extends RuntimeException {
    @Getter
    private Integer status;

    public AccessErrorException(Integer status, String message) {
        super(message);
        this.status = status;
    }

    public AccessErrorException(Integer status, String message, Throwable cause) {
        super(message);
        this.status = status;
    }
}
