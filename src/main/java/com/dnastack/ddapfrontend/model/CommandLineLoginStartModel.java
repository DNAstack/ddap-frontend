package com.dnastack.ddapfrontend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommandLineLoginStartModel {
    private String browserLoginUrl;
    private String tokenResponseUrl;
    private String responseBearerToken;
}
