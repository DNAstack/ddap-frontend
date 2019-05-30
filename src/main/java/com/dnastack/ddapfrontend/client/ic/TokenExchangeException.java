package com.dnastack.ddapfrontend.client.ic;

import org.springframework.web.reactive.function.UnsupportedMediaTypeException;

public class TokenExchangeException extends IcClientException {
    public TokenExchangeException(String message) {
        super(message);
    }

    public TokenExchangeException(Throwable t) {
        super(t);
    }

    public TokenExchangeException(String body, Throwable throwable) {
        super(body, throwable);
    }
}
