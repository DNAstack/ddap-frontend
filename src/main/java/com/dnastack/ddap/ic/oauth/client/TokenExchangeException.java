package com.dnastack.ddap.ic.oauth.client;

import com.dnastack.ddap.ic.account.client.IcClientException;

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
