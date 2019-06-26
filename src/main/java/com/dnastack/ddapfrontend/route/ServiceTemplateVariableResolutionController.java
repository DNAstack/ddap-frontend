package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.model.DamItemFormat;
import com.dnastack.ddapfrontend.client.dam.model.DamVariableFormat;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import com.dnastack.ddapfrontend.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1alpha/{realm}/serviceTemplates")
public class ServiceTemplateVariableResolutionController {

    private TemplateService templateService;
    private UserTokenCookiePackager cookiePackager;

    @Autowired
    public ServiceTemplateVariableResolutionController(TemplateService templateService,
                                                       UserTokenCookiePackager cookiePackager) {
        this.templateService = templateService;
        this.cookiePackager = cookiePackager;
    }

    @GetMapping(value = "/variables")
    public Mono<Map<String, DamVariableFormat>> resolveVariables(@PathVariable String realm,
                                                                 @RequestParam(name = "serviceTemplate") String serviceTemplateId,
                                                                 ServerHttpRequest request) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));

        return templateService.getServiceTemplate(realm, damToken, serviceTemplateId)
                .flatMap(serviceTemplate -> templateService.getItemFormatForServiceTemplate(realm, damToken, serviceTemplate)
                        .map(DamItemFormat::getVariables));
    }

}
