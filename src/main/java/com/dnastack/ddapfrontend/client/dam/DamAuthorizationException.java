package com.dnastack.ddapfrontend.client.dam;

import lombok.Getter;

public class DamAuthorizationException extends RuntimeException {

    @Getter
    private Integer status;

    public DamAuthorizationException(Integer status, String message) {
        super(message);
        this.status = status;
    }

    public DamAuthorizationException(Integer status, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
    }

}
