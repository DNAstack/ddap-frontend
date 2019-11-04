# Data Discovery AccessModel Portal Frontend

This repo contains a Spring Boot application that serves the Web UI for
Data Discovery AccessModel Portal (DDAP) and acts as the user-facing edge
service for the rest of the DDAP components.

## User Interface

The user interface is an Angular 6 app served at `/index.html` from static files found
under `src/main/resources/static/**`.


### Building full app with Maven

To build both the Spring Boot backend and Angular frontend, simply do `mvn clean install`.

This project is configured with the maven-frontend-plugin and maven-spring-boot-plugin to produce a single
fat jar containing all angular assets.

### Building the Angular App

Make sure that you are running node on version v11 (exact v11.13.0).

From the `angular/` directory run `npm run build:prod` for a production build, or `ng serve` for development.

### Developing backend and frontend with live reload

_Note_: Order is important.

1. Run frontend build command: `npm run build:dev` (starts a build server that writes changed files to `target/classes/static`)
or `npm run build:watch` (same functionality, but includes a linter).
2. Run the spring boot:
 - in dev mode: `SPRING_PROFILES_ACTIVE=sandbox mvn spring-boot:run -Ddev` (`-Pdev` stops maven from running the full frontend build)
 - with basic auth enabled `SPRING_PROFILES_ACTIVE=sandbox,basic-auth mvn spring-boot:run -Pdev`


## API Gateway

All requests to `/dam/**` are passed to the Data AccessModel Manager (DAM) component,
with backend credentials (clientId and clientSecret) added in by the gateway.

Similarly, all requests to `/identity/**` are passed to the Identity Concentrator with
its own respective clientId and clientSecret.

The gateway configuration is controlled by the following environment variables
(default values shown):

```bash
DAM_BASE_URL=http://localhost:3000/
DAM_CLIENT_ID=local-dev-client-id
DAM_CLIENT_SECRET=local-dev-client-secret

IDP_BASE_URL=http://localhost:3000/
IDP_CLIENT_ID=local-dev-client-id
IDP_CLIENT_SECRET=local-dev-client-secret
```

### Building the API Gateway

```
./mvnw package
```

### Running the API Gateway

```
java -jar target/ddap-frontend-0.0.1-SNAPSHOT.jar

OR (if basic auth should be enabled)

java -jar -Dspring.profiles.active=basic-auth target/ddap-frontend-0.0.1-SNAPSHOT.jar

```

(You will want to set the above DAM_* environment variables to point to a DAM
server if you don't have one running locally)

Then visit http://localhost:8085/index.html

TODO: figure out how to get Spring Webflux to serve the static
`index.html` at `/`.

## Working with DDAP Library

Follow instructions for `ddap-common-lib` https://github.com/DNAstack/ddap-libraries then run `npm link ddap-common-lib` in `angular` project folder.
