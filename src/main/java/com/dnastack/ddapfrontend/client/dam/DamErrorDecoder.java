package com.dnastack.ddapfrontend.client.dam;

import feign.Response;
import feign.codec.ErrorDecoder;

public class DamErrorDecoder implements ErrorDecoder {

    private final ErrorDecoder defaultErrorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        {
            if (response.status() >= 400 && response.status() <= 499) {
                return new Exception("foo bar");
            }
            return defaultErrorDecoder.decode(methodKey, response);
        }
    }
}
