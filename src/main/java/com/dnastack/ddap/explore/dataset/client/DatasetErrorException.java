package com.dnastack.ddap.explore.dataset.client;

import lombok.Getter;

public class DatasetErrorException extends RuntimeException {

    @Getter
    private Integer status;

    public DatasetErrorException(Integer status, String message) {
        super(message);
        this.status = status;
    }

    public DatasetErrorException(Integer status, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
    }
}
