package com.dnastack.ddapfrontend.client.ic;

public class IcClientException extends RuntimeException {
    public IcClientException(String message) {
        super(message);
    }

    public IcClientException(String message, Throwable cause) {
        super(message, cause);
    }

    public IcClientException(Throwable cause) {
        super(cause);
    }
}
