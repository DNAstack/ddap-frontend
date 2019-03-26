package com.dnastack.ddapfrontend;

import lombok.Value;

@Value
public class DdapErrorResponse {
    String message;
    int statusCode;
}
