package com.dnastack.ddapfrontend.client.dam;

import dam.v1.DamService;
import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface FeignDamClient {

    String API_VERSION = "v1alpha";

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/resources")
    DamResources getResources(@Param("realm") String realm);

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/resources/{resourceId}")
    DamResource getResource(@Param("realm") String realmm,
                            @Param("resourceId") String resourceId);

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/resources/{resourceId}/views")
    @Headers("Authorization: Bearer {damToken}")
    DamResourceViews getResourceViews(@Param("damToken") String damToken,
                                      @Param("realm") String realm,
                                      @Param("resourceId") String resourceId);

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/resources/{resourceId}/views/{viewId}/token")
    @Headers("Authorization: Bearer {damToken}")
    LocationAndToken getAccessTokenForView(@Param("damToken") String damToken,
                                           @Param("realm") String realm,
                                           @Param("resourceId") String resourceId,
                                           @Param("viewId") String viewid);

    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/config")
    @Headers("Authorization: Bearer {damToken}")
    DamService.DamConfig getConfig(@Param("damToken") String damToken, @Param("realm") String realm);


    @RequestLine("GET /dam/" + API_VERSION + "/{realm}/targetAdapters")
    @Headers("Authorization: Bearer {damToken}")
    DamService.TargetAdaptersResponse getTargetAdapters(@Param("damToken") String damToken, @Param("realm") String realm);

}
