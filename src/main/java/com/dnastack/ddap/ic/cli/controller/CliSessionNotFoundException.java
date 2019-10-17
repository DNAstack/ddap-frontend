package com.dnastack.ddap.ic.cli.controller;

import static java.lang.String.format;

public class CliSessionNotFoundException extends RuntimeException {
    public CliSessionNotFoundException(String cliSessionId) {
        super(message(cliSessionId));
    }

    public CliSessionNotFoundException(String cliSessionId, Throwable cause) {
        super(message(cliSessionId), cause);
    }

    private static String message(String id) {
        return format("No session found matching id [%s]", id);
    }
}
