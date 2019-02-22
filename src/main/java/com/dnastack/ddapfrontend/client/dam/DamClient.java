package com.dnastack.ddapfrontend.client.dam;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

import java.util.List;

public interface DamClient {

    String API_VERSION = "v1alpha";

    @RequestLine("GET /dam/" + API_VERSION + "/dnastack/resources")
    DamResourceList getResources();


    @RequestLine("GET /dam/" + API_VERSION + "/dnastack/config/resources/{resourceId}")
    @Headers("Authorization: Bearer {damToken}")
    DamResource getResource(@Param("damToken") String damToken,
                            @Param("resourceId") String resourceId);

    @RequestLine("GET /dam/" + API_VERSION + "/dnastack/resources/{resourceId}/views/{viewId}")
    @Headers("Authorization: Bearer {damToken}")
    LocationAndToken getAccessTokenForView(@Param("damToken") String damToken,
                                           @Param("resourceId") String resourceId,
                                           @Param("viewId") String viewid);

}
