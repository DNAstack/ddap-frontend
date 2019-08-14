package com.dnastack.ddapfrontend.client.dataset;

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
