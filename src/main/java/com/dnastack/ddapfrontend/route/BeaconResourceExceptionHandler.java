package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.net.ConnectException;

@Slf4j
//@ControllerAdvice(assignableTypes = {BeaconResource.class})
public class BeaconResourceExceptionHandler {

//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<?> handleException(IllegalArgumentException ex) {
//        BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();
//        beaconQueryResultError.setError(ex.getMessage());
//        log.error("Authorization token is missing");
//        return new ResponseEntity<>(beaconQueryResultError, HttpStatus.UNAUTHORIZED);
//    }
//
//    @ExceptionHandler(FeignException.Unauthorized.class)
//    public ResponseEntity<?> handleException2(FeignException ex) {
//        BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();
//        String errorMessage = "Invalid authorization token: " + ex.getMessage();
//        beaconQueryResultError.setError(errorMessage);
//        log.error("Error making REST request: ", ex.status(), errorMessage, ex);
//        return new ResponseEntity<>(beaconQueryResultError, HttpStatus.UNAUTHORIZED);
//    }
//
//    @ExceptionHandler(ConnectException.class)
//    public ResponseEntity<?> handleException3(ConnectException ex) {
//        BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();
//        String errorMessage = "Failed to connect to: " + ex.getMessage();
//        beaconQueryResultError.setError(errorMessage);
//        return new ResponseEntity<>(beaconQueryResultError, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

}
