package com.dnastack.ddapfrontend.cli;

import static java.lang.String.format;

public class CliSessionNotFound extends RuntimeException {
    public CliSessionNotFound(String cliSessionId) {
        super(message(cliSessionId));
    }

    public CliSessionNotFound(String cliSessionId, Throwable cause) {
        super(message(cliSessionId), cause);
    }

    private static String message(String id) {
        return format("No session found matching id [%s]", id);
    }
}
