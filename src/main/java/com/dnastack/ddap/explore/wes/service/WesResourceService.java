package com.dnastack.ddap.explore.wes.service;

import com.dnastack.ddap.explore.dam.client.ReactiveDamClient;
import com.dnastack.ddap.explore.wes.model.WesResourceViews;
import dam.v1.DamService;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

@Component
public class WesResourceService {

    private static final String WES_SERVICE_DEFINITION = "wes";

    /**
     * Filtering all resources to return only resources with WES views, all other views are stripped off
     *
     * @param damClient
     * @param realm
     * @return Resources with only WES views in convenient format defined by WesResourceViews class
     */
    public Flux<WesResourceViews> getResources(Map.Entry<String, ReactiveDamClient> damClient, String realm) {
        return damClient.getValue().getResources(realm)
                .map(DamService.GetResourcesResponse::getResourcesMap)
                .map(Map::entrySet)
                .map(Collection::stream)
                .map(resources -> getResources(damClient.getKey(), resources))
                .flatMapMany(Flux::fromIterable);
    }

    private List<WesResourceViews> getResources(String damId, Stream<Map.Entry<String, DamService.Resource>> resources) {
        return resources
                .filter(this::hasWesViews)
                .map(resource -> buildWesResource(damId, resource))
                .collect(Collectors.toList());
    }

    private boolean hasWesViews(Map.Entry<String, DamService.Resource> resource) {
        return resource.getValue()
                .getViewsMap()
                .entrySet()
                .stream()
                .anyMatch(view -> view.getValue().getServiceTemplate().equals(WES_SERVICE_DEFINITION));
    }

    private WesResourceViews buildWesResource(String damId, Map.Entry<String, DamService.Resource> resource) {
        WesResourceViews wesResourceViews = new WesResourceViews();
        wesResourceViews.setDamId(damId);
        wesResourceViews.setResource(resource);
        wesResourceViews.setViews(getWesViewsFrom(resource.getValue()));
        return wesResourceViews;
    }

    private List<Map.Entry<String, DamService.View>> getWesViewsFrom(DamService.Resource resource) {
        return resource.getViewsMap()
                .entrySet()
                .stream()
                .filter(view -> view.getValue().getServiceTemplate().equals(WES_SERVICE_DEFINITION))
                .collect(toList());
    }

    public Map.Entry<String, DamService.View> getViewById(WesResourceViews wesResourceViews, String viewId) {
        return wesResourceViews.getViews()
                .stream()
                .filter(stringViewEntry -> stringViewEntry.getKey().equals(viewId))
                .findFirst()
                .get();
    }

    public URI getWesServerUri(DamService.View view) {
        return URI.create(view.getComputedInterfacesMap()
                .values()
                .stream()
                .map(wesInterface -> wesInterface.getUri(0))
                .findFirst()
                .get());
    }

}
