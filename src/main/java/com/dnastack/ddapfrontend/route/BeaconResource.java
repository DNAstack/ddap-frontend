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
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Slf4j
@RestController
class BeaconResource {

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
            // TODO DISCO-2038 Handle errors and unauthorized requests
            final Mono<BeaconQueryResult> beaconQueryResponse = beaconQuery(beaconRequest, viewToken);
            final Mono<BeaconInfo> beaconInfoResponse = beaconInfo();
            return Flux.zip(
                beaconInfoResponse,
                beaconQueryResponse,
                (info, result) -> formatBeaconServerPayload(resourceId, info, result)
            );
        });

        return beaconRequests.reduce(Flux.empty(), Flux::merge);
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
        return WebClient.create()
                        .get()
                        .uri("https://beacon.cafevariome.org/")
                        .exchange()
                        .flatMap(clientResponse -> clientResponse.bodyToMono(BeaconInfo.class));
    }

    private Mono<BeaconQueryResult> beaconQuery(BeaconRequestModel beaconRequest, ViewToken viewToken) {
        return WebClient.create()
                        .get()
                        .uri(beaconQueryUrl(viewToken.getUrl(), beaconRequest))
                        .header("Authorization",
                                "Bearer " + viewToken.getToken())
                        .exchange()
                        .flatMap(clientResponse -> clientResponse.bodyToMono(BeaconQueryResult.class));
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
