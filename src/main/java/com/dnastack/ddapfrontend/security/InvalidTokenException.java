package com.dnastack.ddapfrontend.security;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) { super(message); }

    public InvalidTokenException(String message, Exception cause) {
        super(message, cause);
    }
}
