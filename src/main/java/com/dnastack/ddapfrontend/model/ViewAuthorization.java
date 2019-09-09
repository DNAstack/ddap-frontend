package com.dnastack.ddapfrontend.model;

import lombok.Data;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import dam.v1.DamService.GetTokenResponse;

public class ViewAuthorization {
    @Data
    public static class ViewAuthorizationResponse {

        private final String view;
        private final GetTokenResponse locationAndToken;

        public GetTokenResponse getLocationAndToken() {
            return locationAndToken;
        }

        private final ViewAuthorizationException exception;

        public ViewAuthorizationResponse(String view, GetTokenResponse locationAndToken) {
            this.view = view;
            this.locationAndToken = locationAndToken;
            this.exception = null;
        }

        public ViewAuthorizationResponse(String view, Throwable exception) {
            this.view = view;
            this.exception = ViewAuthorizationException.from(exception);
            this.locationAndToken = null;
        }
    }

    @Data
    public static class ViewAuthorizationException {

        private final String message;
        private final String exceptionClass;
        private final int statusCode;

        ViewAuthorizationException(Throwable throwable) {
            this(500, throwable);
        }

        ViewAuthorizationException(int status, Throwable throwable) {
            this.message = throwable.getMessage();
            this.exceptionClass = throwable.getClass().getName();
            this.statusCode = status;
        }

        static ViewAuthorizationException from(Throwable throwable) {
            if (throwable instanceof WebClientResponseException) {
                return new ViewAuthorizationException(((WebClientResponseException) throwable).getRawStatusCode(),
                        throwable);
            } else {
                return new ViewAuthorizationException(throwable);
            }
        }

    }
}
