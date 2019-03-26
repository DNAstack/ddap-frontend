package com.dnastack.ddapfrontend.security;

import lombok.Getter;

/**
 * Thrown when verification of the OAuth state fails. Likely causes: the state has expired or has been tampered with.
 */
public class InvalidOAuthStateException extends RuntimeException {

    @Getter
    private final String stateToken;

    public InvalidOAuthStateException(String stateToken) {
        this.stateToken = stateToken;
    }

    public InvalidOAuthStateException(Exception cause, String stateToken) {
        super(cause);
        this.stateToken = stateToken;
    }
}
