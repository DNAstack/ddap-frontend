# Data Discovery Access Portal Frontend

This repo contains a Spring Boot application that serves the Web UI for
Data Discovery Access Portal (DDAP) and acts as the user-facing edge
service for the rest of the DDAP components.

## User Interface

The user interface is an Angular 6 app served at `/` from static files found
under `src/main/resources/static/**`.

### Building the Angular App

TODO fill in details. The build should dump its final output into
`src/main/resources/static`.

### Developing with live reload


## API Gateway

All requests to `/dam/**` are passed to the Data Access Manager (DAM) component,
with backend credentials (clientId and clientSecret) added in by the gateway.

The gateway configuration is controlled by the following environment variables
(default values shown):

```bash
DAM_BASE_URL=http://localhost:3000/
DAM_CLIENT_ID=local-dev-client-id
DAM_CLIENT_SECRET=local-dev-client-secret
```

### Building the API Gateway

```
./mvnw package
```

### Running the API Gateway

```
java -jar target/ddap-frontend-0.0.1-SNAPSHOT.jar
```

(You will want to set the above DAM_* environment variables to point to a DAM
server if you don't have one running locally)

Then visit http://localhost:8080/index.html

TODO: figure out how to get Spring Webflux to serve the static
`index.html` at `/`.
