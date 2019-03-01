package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.beacon.BeaconInfo;
import com.dnastack.ddapfrontend.beacon.BeaconOrganization;
import com.dnastack.ddapfrontend.beacon.BeaconQueryResult;
import com.dnastack.ddapfrontend.beacon.ExternalBeaconQueryResult;
import com.dnastack.ddapfrontend.client.dam.DamClient;
import com.dnastack.ddapfrontend.client.dam.DamResource;
import com.dnastack.ddapfrontend.client.dam.DamResourceList;
import com.dnastack.ddapfrontend.client.dam.DamView;
import com.dnastack.ddapfrontend.model.BeaconRequestModel;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.security.UserTokenStatusFilter;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import static java.lang.String.format;
import static java.util.stream.Collectors.toList;

@RestController
class BeaconResource {

    private static final String BEACON_QUERY_TEMPLATE = "%s" +
            "?assemblyId=%s" +
            "&referenceName=%s" +
            "&start=%s" +
            "&referenceBases=%s" +
            "&alternateBases=%s";

    @Autowired
    private DamClient damClient;

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @GetMapping(value = "/api/resources/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQuery(BeaconRequestModel beaconRequest, ServerHttpRequest request) {

        DamResourceList resourceList = damClient.getResources();

        List<String> resourceNameList = resourceList.getResources().stream()
                .map(entry -> entry.getName())
                .collect(toList());

        Flux<ExternalBeaconQueryResult> fluxResult = Flux.empty();
        Flux<ExternalBeaconQueryResult> externalBeaconQueryResultFlux;
        for (String resourceName: resourceNameList) {
            externalBeaconQueryResultFlux =
                    handleBeaconQueryForResource(resourceName, beaconRequest, request);
            fluxResult = fluxResult.merge(externalBeaconQueryResultFlux);
        }

        return fluxResult;
    }

    @GetMapping(value = "/api/resources/{resourceId}/search", params = "type=beacon")
    public Flux<ExternalBeaconQueryResult> handleBeaconQueryForResource(
            @PathVariable String resourceId,
            BeaconRequestModel beaconRequest,
            ServerHttpRequest request) {

        // find beacons under resourceId in DAM config
        Optional<String> damToken = cookiePackager.extractToken(request, UserTokenCookiePackager.TokenAudience.DAM);
        if (!damToken.isPresent()) {
            return Flux.error(new IllegalArgumentException("Authorization is required")); // TODO make this return a 401
        }


        DamResource resource = damClient.getResource(damToken.get(), resourceId);

        // find all the views with beacon URLs
        List<ViewToken> beaconViewTokens = resource.getViews().entrySet().stream()
                .flatMap(entry -> {
                    String viewId = entry.getKey();
                    DamView view = entry.getValue();
                    Map<String, String> interfaces = view.getInterfaces();
                    String beaconInterface = interfaces.get("http:beacon");
                    if (beaconInterface != null) {
                        return Stream.of(new ViewToken(viewId, beaconInterface, damClient.getAccessTokenForView(damToken.get(), resourceId, viewId).getToken()));
                    }
                    return Stream.of();
                })
                .collect(toList());

        Mono[] beaconRequests = beaconViewTokens.stream().map(viewToken -> {
            final Mono<BeaconQueryResult> beaconQueryResponse = WebClient.create()
                    .get()
                    .uri(format(
                            BEACON_QUERY_TEMPLATE,
                            viewToken.getUrl(),
                            beaconRequest.getAssemblyId(),
                            beaconRequest.getReferenceName(),
                            beaconRequest.getStart(),
                            beaconRequest.getReferenceBases(),
                            beaconRequest.getAlternateBases()))
                    .header("Authorization", "Bearer " + viewToken.getToken())
                    .exchange()
                    .flatMap(clientResponse -> clientResponse.bodyToMono(
                            BeaconQueryResult.class));
            final Mono<BeaconInfo> beaconInfoResponse = WebClient.create()
                    .get()
                    .uri("https://beacon.cafevariome.org/")
                    .exchange()
                    .flatMap(clientResponse -> clientResponse.bodyToMono(
                            BeaconInfo.class));
            return Mono.zip(beaconInfoResponse, beaconQueryResponse, this::formatBeaconServerPayload);
        }).toArray(Mono[]::new);

        return Flux.merge(beaconRequests);
    }

    private ExternalBeaconQueryResult formatBeaconServerPayload(BeaconInfo infoResponse, BeaconQueryResult queryResponse) {
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
