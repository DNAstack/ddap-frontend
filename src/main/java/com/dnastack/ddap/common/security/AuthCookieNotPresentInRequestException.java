package com.dnastack.ddap.common.security;

public class AuthCookieNotPresentInRequestException extends RuntimeException {

    public AuthCookieNotPresentInRequestException(String cookieKind) {
        super("Cookie of " + cookieKind + " kind is required, but not present in request.");
    }

}
