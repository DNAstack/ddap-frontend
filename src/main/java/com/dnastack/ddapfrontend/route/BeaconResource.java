package com.dnastack.ddapfrontend.route;

import static java.lang.String.format;

import com.dnastack.ddapfrontend.beacon.BeaconInfo;
import com.dnastack.ddapfrontend.beacon.BeaconOrganization;
import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import com.dnastack.ddapfrontend.beacon.ExternalBeaconQueryResult;
import com.dnastack.ddapfrontend.client.dam.DamClient;
import com.dnastack.ddapfrontend.client.dam.DamInterface;
import com.dnastack.ddapfrontend.client.dam.DamResourceViews;
import com.dnastack.ddapfrontend.client.dam.DamResources;
import com.dnastack.ddapfrontend.client.dam.DamView;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;

import java.net.ConnectException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import feign.FeignException;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


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

    @Autowired
    private DamClient damClient;

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @GetMapping(value = "/api/v1alpha/{realm}/resources/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQuery(BeaconRequestModel beaconRequest, ServerHttpRequest request, @PathVariable String realm) {

        DamResources resourceList = damClient.getResources(realm);

        Collection<String> resourceNameList = resourceList.getResources().keySet();

        Flux<ExternalBeaconQueryResult> fluxResult = Flux.empty();
        for (String resourceName: resourceNameList) {
            Flux<ExternalBeaconQueryResult> externalBeaconQueryResultFlux =
                    handleBeaconQueryForResource(resourceName, beaconRequest, request, realm);
            fluxResult = Flux.merge(fluxResult, externalBeaconQueryResultFlux);
        }

        return fluxResult;
    }

    @GetMapping(value = "/api/v1alpha/{realm}/resources/{resourceId}/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQueryForResource(
            @PathVariable String resourceId,
            BeaconRequestModel beaconRequest,
            ServerHttpRequest request,
            @PathVariable String realm) {
        // find beacons under resourceId in DAM config
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.TokenAudience.DAM);
        if (!damToken.isPresent()) {
            return Flux.error(new IllegalArgumentException("Authorization token is required"));
        }


        DamResourceViews resource = damClient.getResourceViews(damToken.get(), realm, resourceId);

        // find all the views with beacon URLs
        Stream<ViewToken> beaconViewTokens = resource.getViews().entrySet().stream()
                                                   .flatMap(entry -> processResourceBeacons(resourceId,
                                                                                            realm,
                                                                                            damToken.get(),
                                                                                            entry));

        Stream<Flux<ExternalBeaconQueryResult>> beaconRequests = beaconViewTokens.map(viewToken -> {
            log.debug("About to query: {} beacon at {}", viewToken.getViewId(), viewToken.getUrl());
            // TODO DISCO-2038 Handle errors and unauthorized requests
            final Mono<BeaconQueryResult> beaconQueryResponse = beaconQuery(beaconRequest, viewToken).doOnError(e -> {
                log.error("Beacon query response error: ", e);
            }).doOnCancel(() -> {
                log.error("Stream got cancelled!");
                }
            ).doAfterTerminate(() -> {
                log.error("Stream got terminated");
            })
                    .map(k ->
                    {
                        log.error("Result is: " + k);
                        return k;
                    });

//            beaconQueryResponse.log().subscribe(System.out::println);
            log.error("Before: &&&");
            try {
                //BeaconQueryResult beaconQueryResult = beaconQueryResponse.block();


            } catch (Throwable ex) {
                log.error("Foobar12334", ex);

            }
//            log.error("%%%: " + beaconQueryResult);


            final Mono<BeaconInfo> beaconInfoResponse = beaconInfo().doOnError(e -> {
                log.error("Beacon info response error:", e);
            });
            return Flux.zip(
                beaconInfoResponse,
                beaconQueryResponse,
                (info, result) -> formatBeaconServerPayload(resourceId, info, result)
            );
        });

        Flux<ExternalBeaconQueryResult> resultFlux = beaconRequests.reduce(Flux.empty(), Flux::merge);
        return resultFlux.doOnNext(e -> {
                log.error("Inside result flux" + e);
        }).doOnError(e -> {
            log.error("Error occurred: " + e);
        }).doOnCancel(() ->{
                log.debug("Got cancelled!");
        }).defaultIfEmpty(ExternalBeaconQueryResult.builder().name("Foobar22!!!").build());
    }

    private Stream<? extends ViewToken> processResourceBeacons(String resourceId, String realm, String damToken, Map.Entry<String, DamView> entry) {
        String viewId = entry.getKey();
        DamView view = entry.getValue();
        Map<String, DamInterface> interfaces = view.getInterfaces();
        DamInterface beaconInterface = interfaces.get("http:beacon");
        if (beaconInterface != null) {
            log.debug("Found beacon interface in view [{}/{}]", resourceId, viewId);
            final Optional<String> foundUri = beaconInterface.getUri().stream().findFirst();
            return foundUri.map(uri -> new ViewToken(viewId,
                                                     uri,
                                                     damClient.getAccessTokenForView(
                                                             damToken,
                                                             realm,
                                                             resourceId,
                                                             viewId).getToken()))
                           .map(Stream::of)
                           .orElse(Stream.empty());
        } else {
            log.debug("No beacon interface found in view [{}/{}]", resourceId, viewId);
            return Stream.of();
        }
    }

    private Mono<BeaconInfo> beaconInfo() {
        return webClient
                        .get()
                        .uri("https://beacon.cafevariome.org/")
                        .exchange()
                        .flatMap(clientResponse -> clientResponse.bodyToMono(BeaconInfo.class));
    }

    private Mono<BeaconQueryResult> beaconQuery(BeaconRequestModel beaconRequest, ViewToken viewToken) {
            return webClient
                    .get()
                    .uri(beaconQueryUrl(viewToken.getUrl(), beaconRequest))
                    .header("Authorization",
                            "Bearer " + viewToken.getToken())
                    .exchange()
                    .flatMap(clientResponse -> {
                        if (clientResponse.statusCode().isError()) {
                            log.error("Actually entered isError if");

                            return clientResponse.bodyToMono(String.class).flatMap(errorMessageBody -> {
                                //log.error("Handling error code from client");
                                //return Mono.error(new Exception("HTTP error response code: " + clientResponse.statusCode() + " " + errorMessageBody));
                                BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();
                                String errorMessage = "Handling error code from client " + clientResponse.statusCode() + " " + errorMessageBody;
                                log.error(errorMessage);
                                beaconQueryResultError.setError(errorMessage);
                                System.out.println(beaconQueryResultError);
                                Mono<BeaconQueryResult> errorResult = Mono.just(beaconQueryResultError);
                                return errorResult;
                            });
                        }
                        log.error("^^^^^^^^^^^^^^^^^^^^^^");
                        return clientResponse.bodyToMono(BeaconQueryResult.class);
                    })
                    .onErrorMap(e -> {
                        log.error("Bad stuff happened!!!!!!!!");
                        return new Exception("Something really bad happened: " + e);

                    })
                    .onErrorResume(e -> {
                        BeaconQueryResult beaconQueryResultError = new BeaconQueryResult();
                        String errorMessage = "Error making REST request: " + e;
                        log.error(errorMessage);
                        beaconQueryResultError.setError(errorMessage);
                        Mono<BeaconQueryResult> errorResult = Mono.just(beaconQueryResultError);
                        System.out.println(errorResult.block());
                        return errorResult;
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

    private ExternalBeaconQueryResult formatBeaconServerPayload(String resourceId, BeaconInfo infoResponse, BeaconQueryResult queryResponse) {
        final ExternalBeaconQueryResult externalResult = new ExternalBeaconQueryResult();

        log.debug("Zipping {} {}", infoResponse, queryResponse);
        final String beaconName = Optional.ofNullable(infoResponse)
                                          .map(BeaconInfo::getName)
                                          .orElse("Unknown");
        final String organizationName = Optional.ofNullable(infoResponse)
                                                .map(BeaconInfo::getOrganization)
                                                .map(BeaconOrganization::getName)
                                                .orElse("Unknown");


        final Optional<BeaconQueryResult> oQueryResponse = Optional.ofNullable(queryResponse);

        final Boolean exists = oQueryResponse.map(BeaconQueryResult::getExists).orElse(null);

        externalResult.setResource(resourceId);
        externalResult.setName(beaconName);
        externalResult.setOrganization(organizationName);
        externalResult.setExists(exists);

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
                      .ifPresent(error -> externalResult.getMetadata().put("error", error));

        return externalResult;
    }

    @Value
    private static class ViewToken {
        String viewId;
        String url;
        String token;
    }
}
