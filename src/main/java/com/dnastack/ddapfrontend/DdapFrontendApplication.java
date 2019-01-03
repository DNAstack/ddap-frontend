package com.dnastack.ddapfrontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@SpringBootApplication
public class DdapFrontendApplication {

    static Process started = null;

    public static void main(String[] args) throws IOException {
        File lockFile = new File("target/frontend.lock");
        try {
            /* Check if this is a dev environment, if so, enable hot reloading build for frontend */
            String frontEndBuildExecutablePath = System.getenv("FRONTEND_BUILD_EXECUTABLE_PATH");



            if (!StringUtils.isEmpty(frontEndBuildExecutablePath) && (started == null) && (!lockFile.exists())) {
                ProcessBuilder processBuilder = new ProcessBuilder(frontEndBuildExecutablePath, "run", "build:dev").inheritIO();
                processBuilder.directory(new File("./angular"));
                started = processBuilder.start();
                lockFile.createNewFile();
            }
            SpringApplication.run(DdapFrontendApplication.class, args);
        } finally {
            Files.deleteIfExists(lockFile.toPath());

//            if (started != null && started.isAlive()) {
//                started.destroy();
//            }

        }
    }
}


