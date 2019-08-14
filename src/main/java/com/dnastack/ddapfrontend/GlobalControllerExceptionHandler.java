package com.dnastack.ddapfrontend;

import static com.dnastack.ddapfrontend.http.XForwardUtil.getExternalHost;
import static com.dnastack.ddapfrontend.security.UserTokenCookiePackager.CookieKind.OAUTH_STATE;
import static org.springframework.http.HttpHeaders.SET_COOKIE;

import com.dnastack.ddapfrontend.cli.CliSessionNotFound;
import com.dnastack.ddapfrontend.client.dataset.DatasetErrorException;
import com.dnastack.ddapfrontend.client.ic.AccountLinkingFailedException;
import com.dnastack.ddapfrontend.security.BadCredentialsException;
import com.dnastack.ddapfrontend.security.InvalidOAuthStateException;
import com.dnastack.ddapfrontend.security.InvalidTokenException;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @ExceptionHandler(InvalidOAuthStateException.class)
    public ResponseEntity<DdapErrorResponse> handle(ServerHttpRequest request, InvalidOAuthStateException ex) {
        log.info("Failing token exchange due to bad state value " + ex.getStateToken(), ex);
        return ResponseEntity
            .status(400)
            .header(SET_COOKIE, cookiePackager.clearToken(getExternalHost(request), OAUTH_STATE).toString())
            .body(new DdapErrorResponse(ex.getMessage(), 400));
    }

    @ExceptionHandler({IllegalArgumentException.class, AccountLinkingFailedException.class, CliSessionNotFound.class})
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

    @ExceptionHandler(DatasetErrorException.class)
    public ResponseEntity<DdapErrorResponse> handle(DatasetErrorException ex) {
        int status = ex.getStatus() == null ? 500 : ex.getStatus();
        return ResponseEntity.status(status).body(new DdapErrorResponse(ex.getMessage(), status));
    }

}
