package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.beacon.BeaconInfo;
import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import com.dnastack.ddapfrontend.beacon.ExternalBeaconQueryResult;
import com.dnastack.ddapfrontend.client.dam.DamClient;
import com.dnastack.ddapfrontend.client.dam.DamResource;
import com.dnastack.ddapfrontend.client.dam.DamResources;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import com.dnastack.ddapfrontend.model.InterfaceModel;
import com.dnastack.ddapfrontend.model.ResourceModel;
import com.dnastack.ddapfrontend.model.ViewModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import feign.FeignException;
import lombok.Builder;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.net.URI;
import java.util.*;

import static java.lang.String.format;


@Slf4j
@RestController
class BeaconResource {

    private final WebClient webClient = WebClient.builder()
            .filter(logRequest())
            .filter(logResponse())
            .build();

    private static ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            log.info(">>> {} {}", clientRequest.method(), clientRequest.url());
            clientRequest.headers()
                    .forEach((name, values) -> log.info("  {}: {}", name, values));
            return Mono.just(clientRequest);
        });
    }

    private static ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            log.info("<<< HTTP {}", clientResponse.rawStatusCode());
            clientResponse.headers().asHttpHeaders()
                    .forEach((name, values) -> log.info("  {}: {}", name, values));
            return Mono.just(clientResponse);
        });
    }

    private static final String BEACON_INTERFACE = "http:beacon";

    @Autowired
    private DamClient damClient;
    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @GetMapping(value = "/api/v1alpha/{realm}/resources/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQuery(@PathVariable String realm,
                                                             BeaconRequestModel beaconRequest,
                                                             ServerHttpRequest request) {
        DamResources damResourcesResponse = damClient.getResources(realm);
        Map<String, ResourceModel> resources = damResourcesResponse.getResources();

        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        if (!damToken.isPresent()) {
            return Flux.error(new IllegalArgumentException("Authorization token is required"));
        }

        return resources.entrySet().stream()
                .map(resource -> handleBeaconQuery(realm, resource, beaconRequest, damToken.get()))
                .reduce(Flux::merge)
                .orElse(Flux.empty());
    }

    private Flux<ExternalBeaconQueryResult> handleBeaconQuery(String realm,
                                                              Map.Entry<String, ResourceModel> resource,
                                                              BeaconRequestModel beaconRequest,
                                                              String damToken) {

        Map<String, ViewModel> views = resource.getValue().getViews();

        Flux<ViewTokenResponse> beaconViewTokens = Flux.fromIterable(views.entrySet())
                                                       .flatMap(entry -> getAuthTokens(realm, resource.getKey(), entry, damToken));

        Flux<ExternalBeaconQueryResult> beaconRequests = beaconViewTokens.flatMap(viewTokenResponse -> {
            log.debug("About to query: {} beacon at {}", viewTokenResponse.getViewId(), viewTokenResponse.getUrl());
            // TODO DISCO-2038 Handle errors and unauthorized requests

            if (!viewTokenResponse.getToken().isPresent()) {
                String errorMessage = "No view token found for viewID: " + viewTokenResponse.getViewId();
                String uiLabel = views.get(viewTokenResponse.getViewId()).getLabel();
                log.info(errorMessage);
                return Flux.just(externalBeaconQueryResultError(new Throwable(errorMessage)));
            }

            Mono<BeaconInfo> beaconInfoResponse;

            URI beaconRootUri = URI.create(viewTokenResponse.getUrl());
            beaconInfoResponse = beaconInfo(beaconRootUri, viewTokenResponse.getToken().get())
                    .onErrorResume(e -> {
                        return Mono.just(buildBeaconInfoError(e));
                    });

            Mono<BeaconQueryResult> queryResultMono = beaconQuery(beaconRequest, viewTokenResponse).onErrorResume(e -> {
                /* Handle the error case where there was no response from beacon server */
                BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();
                String errorMessage = "Server not found: " + e;
                log.warn(errorMessage);
                beaconQueryResultError.setError(errorMessage);
                Mono<BeaconQueryResult> errorResult = Mono.just(beaconQueryResultError);
                return errorResult;
            });
            Flux<ExternalBeaconQueryResult> zip = Flux.zip(
                    beaconInfoResponse,
                    queryResultMono,
                    (info, result) -> formatBeaconServerPayload(resource, info, result)
            );
            return zip;
        })
        .onErrorResume(fluxError -> {
            String errorMessage = fluxError.getMessage();
            log.info("Error occurred while processing view tokens: " + errorMessage);
            return Flux.just(externalBeaconQueryResultError(fluxError));
        });

        return beaconRequests;
    }

    private Flux<ViewTokenResponse> getAuthTokens(String realm,
                                                  String resourceId,
                                                  Map.Entry<String, ViewModel> view,
                                                  String damToken) {
        Map<String, InterfaceModel> interfaces = view.getValue().getInterfaces();
        if (!interfaces.containsKey(BEACON_INTERFACE)) {
            return Flux.empty();
        }

        Optional<String> firstUri = interfaces.get("http:beacon")
                .getUri()
                .stream()
                .findFirst();

        try {
            String token = damClient.getAccessTokenForView(damToken, realm, resourceId, view.getKey()).getToken();

            Optional<ViewTokenResponse> viewToken = firstUri.map(uri -> ViewTokenResponse.builder()
                                                                                         .viewId(view.getKey())
                                                                                         .token(Optional.of(token))
                                                                                         .url(uri)
                                                                                         .build());
            return Flux.fromStream(viewToken.stream());

        } catch (FeignException ex) {
            String beaconName = view.getValue().toString();
            String errorMessage = "Unable to get the right authorization token: " + beaconName;
            return Flux.error(new BeaconAuthorizationException(errorMessage));
        }
    }

    @GetMapping(value = "/api/v1alpha/{realm}/resources/{resourceId}/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQueryFor(@PathVariable String realm,
                                                                @PathVariable String resourceId,
                                                                BeaconRequestModel beaconRequest,
                                                                ServerHttpRequest request) {
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        if (!damToken.isPresent()) {
            return Flux.error(new IllegalArgumentException("Authorization token is required"));
        }

        DamResource damResourceResponse = damClient.getResource(realm, resourceId);
        Map.Entry<String, ResourceModel> resource = Map.entry(resourceId, damResourceResponse.getResource());

        return handleBeaconQuery(realm, resource, beaconRequest, damToken.get());
    }

    private Mono<BeaconInfo> extractBeaconInfo(ClientResponse clientResponse) {

        boolean is2xxResponse = clientResponse.statusCode().is2xxSuccessful();
        boolean hasContentTypeJson = clientResponse.headers().contentType()
                .filter(contentType -> contentType.isCompatibleWith(MediaType.APPLICATION_JSON)).isPresent();

        if (!is2xxResponse || !hasContentTypeJson) {
            return clientResponse.bodyToMono(String.class)
                    .flatMap(errBody -> Mono.error(new IOException("Couldn't read beacon info response: " + errBody)));
        }

        return clientResponse.bodyToMono(BeaconInfo.class);

    }

    private Mono<BeaconInfo> beaconInfo(URI rootBeaconUri, String token) {

        URI beaconUrl = rootBeaconUri.resolve("?access_token=" + token);

        return webClient
                .get()
                .uri(beaconUrl)
                .exchange()
                .flatMap(this::extractBeaconInfo) ;
    }

    private BeaconInfo buildBeaconInfoError(Throwable e) {
        BeaconInfo beaconInfoError = new BeaconInfo();
        String error = "Could not get beacon metadata successfully: " + e;
        beaconInfoError.setError(error);
        return beaconInfoError;
    }

    private ExternalBeaconQueryResult externalBeaconQueryResultError(Throwable e) {
        ExternalBeaconQueryResult externalBeaconQueryResultError = new ExternalBeaconQueryResult();
        String error = "Could not get beacon external query results: " + e;
        externalBeaconQueryResultError.setError(error);
        return externalBeaconQueryResultError;
    }


    private Mono<BeaconQueryResult> beaconQuery(BeaconRequestModel beaconRequest, ViewTokenResponse viewTokenResponse) {
        return webClient
                .get()
                .uri(beaconQueryUrl(viewTokenResponse.getUrl() + "/query", beaconRequest))
                .header("Authorization",
                        "Bearer " + viewTokenResponse.getToken())
                .exchange()
                .flatMap(clientResponse -> {

                    HttpStatus statusCode = clientResponse.statusCode();
                    if (statusCode.isError()) {
                        BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();

                        if (statusCode.is4xxClientError()) {
                            return clientResponse.bodyToMono(String.class).flatMap(errorMessageBody -> {
                                String errorMessage = "Invalid authorization token " + clientResponse.statusCode() + " " + errorMessageBody;
                                log.info(errorMessage);
                                beaconQueryResultError.setError(errorMessage);
                                Mono<BeaconQueryResult> errorResult = Mono.just(beaconQueryResultError);
                                return errorResult;
                            });
                        }

                        if (statusCode.is5xxServerError()) {
                            return clientResponse.bodyToMono(String.class).flatMap(errorMessageBody -> {
                                String errorMessage = "Internal server error occurred " + clientResponse.statusCode() + " " + errorMessageBody;
                                log.info(errorMessage);
                                beaconQueryResultError.setError(errorMessage);
                                Mono<BeaconQueryResult> errorResult = Mono.just(beaconQueryResultError);
                                return errorResult;
                            });
                        }
                    }
                    return clientResponse.bodyToMono(BeaconQueryResult.class);
                });
    }

    private String beaconQueryUrl(String baseUrl, BeaconRequestModel beaconRequest) {
        return format("%s" +
                        "?assemblyId=%s" +
                        "&referenceName=%s" +
                        "&start=%s" +
                        "&referenceBases=%s" +
                        "&alternateBases=%s",
                baseUrl,
                beaconRequest.getAssemblyId(),
                beaconRequest.getReferenceName(),
                beaconRequest.getStart(),
                beaconRequest.getReferenceBases(),
                beaconRequest.getAlternateBases());
    }

    private ExternalBeaconQueryResult formatBeaconServerPayload(Map.Entry<String, ResourceModel> resource,
                                                                BeaconInfo infoResponse,
                                                                BeaconQueryResult queryResponse) {
        final ExternalBeaconQueryResult externalResult = new ExternalBeaconQueryResult();

        log.debug("Zipping {} {}", infoResponse, queryResponse);

        final Optional<BeaconQueryResult> oQueryResponse = Optional.ofNullable(queryResponse);

        final Boolean exists = oQueryResponse.map(BeaconQueryResult::getExists).orElse(null);

        externalResult.setResource(Map.of(
                "name", resource.getKey(),
                "label", resource.getValue().getLabel()
        ));
        externalResult.setExists(exists);
        externalResult.setBeaconInfo(infoResponse);

        Map<String, String> info = new HashMap<>();
        info.put("Allele origin", "Germline");
        info.put("Clinical significance", "Pathogenic");
        info.put("Clinical significance citations", "PMID:23108138");
        info.put("Collection method", "Curation");
        info.put("Condition category", "Disease");
        info.put("Gene symbol", "BRCA2");

        if (exists != null && exists) {
            externalResult.setInfo(info);
        }

        oQueryResponse.map(BeaconQueryResult::getAlleleRequest)
                .ifPresent(alleleRequest -> externalResult.getMetadata().put("alleleRequest", alleleRequest));
        oQueryResponse.map(BeaconQueryResult::getDatasetAlleleResponses)
                .ifPresent(datasetAlleleResponses -> externalResult.getMetadata().put("datasetAlleleResponses",
                        datasetAlleleResponses));
        oQueryResponse.map(BeaconQueryResult::getError)
                .ifPresent(error -> externalResult.setError(error));

        return externalResult;
    }

    @Builder
    @Value
    private static class ViewTokenResponse {
        String viewId;
        String url;
        Optional<String> token;
        Optional<Throwable> error;
    }
}
