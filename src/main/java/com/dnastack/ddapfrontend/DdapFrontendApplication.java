package com.dnastack.ddapfrontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.StringUtils;

import java.io.IOException;

@SpringBootApplication
public class DdapFrontendApplication {

    public static void main(String[] args) throws IOException {

        Process started = null;
        try {
            /* Check if this is a dev environment, if so, enable hot reloading build for frontend */
            String frontEndBuildExecutablePath = System.getenv("FRONTEND_BUILD_EXECUTABLE_PATH");

            if (!StringUtils.isEmpty(frontEndBuildExecutablePath)) {
                ProcessBuilder processBuilder = new ProcessBuilder(frontEndBuildExecutablePath, "run build:dev");
                started = processBuilder.start();
            }
            SpringApplication.run(DdapFrontendApplication.class, args);
        } finally {
            if (started != null) {
                started.destroy();
            }

        }
    }
}


