package com.dnastack.ddap.common;

import com.dnastack.ddap.common.security.*;
import com.dnastack.ddap.common.util.http.XForwardUtil;
import com.dnastack.ddap.explore.dataset.client.DatasetErrorException;
import com.dnastack.ddap.ic.account.client.AccountLinkingFailedException;
import com.dnastack.ddap.ic.cli.controller.CliSessionNotFoundException;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind.OAUTH_STATE;
import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @ExceptionHandler(InvalidOAuthStateException.class)
    public ResponseEntity<DdapErrorResponse> handle(ServerHttpRequest request, InvalidOAuthStateException ex) {
        log.info("Failing token exchange due to bad state value " + ex.getStateToken(), ex);
        return ResponseEntity
            .status(400)
            .header(SET_COOKIE, cookiePackager.clearToken(XForwardUtil.getExternalHost(request), OAUTH_STATE).toString())
            .body(new DdapErrorResponse(ex.getMessage(), 400));
    }

    @ExceptionHandler({IllegalArgumentException.class, AccountLinkingFailedException.class, CliSessionNotFoundException.class})
    public ResponseEntity<DdapErrorResponse> handle(RuntimeException ex) {
        return ResponseEntity.status(400).body(new DdapErrorResponse(ex.getMessage(), 400));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<DdapErrorResponse> handle(BadCredentialsException ex) {
        return ResponseEntity.status(403).body(new DdapErrorResponse(ex.getMessage(), 403));
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<DdapErrorResponse> handle(InvalidTokenException ex) {
        return ResponseEntity.status(401).body(new DdapErrorResponse(ex.getMessage(), 401));
    }

    @ExceptionHandler(AuthCookieNotPresentInRequestException.class)
    public ResponseEntity<DdapErrorResponse> handle(AuthCookieNotPresentInRequestException ex) {
        return ResponseEntity.status(401).body(new DdapErrorResponse(ex.getMessage(), 401));
    }

    @ExceptionHandler(DatasetErrorException.class)
    public ResponseEntity<DdapErrorResponse> handle(DatasetErrorException ex) {
        int status = ex.getStatus() == null ? 500 : ex.getStatus();
        return ResponseEntity.status(status).body(new DdapErrorResponse(ex.getMessage(), status));
    }

    @Value
    private static class DdapErrorResponse {
        String message;
        int statusCode;
    }

}
