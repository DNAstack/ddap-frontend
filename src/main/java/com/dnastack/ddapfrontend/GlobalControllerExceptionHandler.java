package com.dnastack.ddapfrontend;

import com.dnastack.ddapfrontend.client.ic.AccountLinkingFailedException;
import com.dnastack.ddapfrontend.client.ic.TokenExchangeException;
import com.dnastack.ddapfrontend.security.InvalidOAuthStateException;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.dnastack.ddapfrontend.header.XForwardUtil.getExternalHost;
import static com.dnastack.ddapfrontend.security.UserTokenCookiePackager.TokenAudience.OAUTH_STATE;
import static org.springframework.http.HttpHeaders.SET_COOKIE;

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
                .body(new DdapErrorResponse("Invalid state token", 400));
    }

    @ExceptionHandler(AccountLinkingFailedException.class)
    public ResponseEntity<DdapErrorResponse> handle(AccountLinkingFailedException ex) {
        return ResponseEntity.status(400).body(new DdapErrorResponse(ex.getMessage(), 400));
    }

}
