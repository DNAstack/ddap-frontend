package com.dnastack.ddapfrontend.client.ic;

import org.springframework.web.reactive.function.client.ClientResponse;

public class TokenExchangeException extends RuntimeException {
    private final ClientResponse idpTokenResponse;

    public TokenExchangeException(ClientResponse idpTokenResponse) {
        this.idpTokenResponse = idpTokenResponse;
    }
}
