package com.dnastack.ddapfrontend.client.dam;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface DamClient {

    String API_VERSION = "v1alpha";

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/resources")
    DamResourceList getResources(@Param("realm") String realm);


    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/config/resources/{resourceId}")
    @Headers("Authorization: Bearer {damToken}")
    DamResource getResource(@Param("damToken") String damToken,
                            @Param("realm") String realm,
                            @Param("resourceId") String resourceId);

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/resources/{resourceId}/views/{viewId}")
    @Headers("Authorization: Bearer {damToken}")
    LocationAndToken getAccessTokenForView(@Param("damToken") String damToken,
                                           @Param("realm") String realm,
                                           @Param("resourceId") String resourceId,
                                           @Param("viewId") String viewid);

}
