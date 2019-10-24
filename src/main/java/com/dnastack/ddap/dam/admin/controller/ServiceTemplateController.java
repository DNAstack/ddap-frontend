package com.dnastack.ddap.dam.admin.controller;

import com.dnastack.ddap.common.security.UserTokenCookiePackager;
import com.dnastack.ddap.dam.admin.client.DamAdminClientFactory;
import com.dnastack.ddap.dam.admin.client.ReactiveAdminDamClient;
import dam.v1.DamService;
import dam.v1.DamService.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Set;

import static com.dnastack.ddap.common.security.UserTokenCookiePackager.CookieKind;
import static java.lang.String.format;

@RestController
@RequestMapping(value = "/api/v1alpha/{realm}/dam/{damId}/service-templates")
public class ServiceTemplateController {

    private UserTokenCookiePackager cookiePackager;
    private DamAdminClientFactory damClientFactory;

    @Autowired
    public ServiceTemplateController(UserTokenCookiePackager cookiePackager,
                                     DamAdminClientFactory damClientFactory) {
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
    }

    @GetMapping(value = "/{serviceTemplateId}/variables")
    public Mono<Map<String, VariableFormat>> resolveVariables(ServerHttpRequest request,
                                                              @PathVariable String realm,
                                                              @PathVariable String damId,
                                                              @PathVariable String serviceTemplateId) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));
        final ReactiveAdminDamClient damClient = damClientFactory.getDamClient(damId);

        return getServiceTemplate(damClient, realm, tokens, serviceTemplateId)
            .flatMap(serviceTemplate -> getItemFormatForServiceTemplate(damClient, realm, tokens, serviceTemplate)
                .map(ItemFormat::getVariablesMap));
    }

    private Mono<ServiceTemplate> getServiceTemplate(ReactiveAdminDamClient damClient,
                                                     String realm,
                                                     Map<CookieKind, String> tokens,
                                                     String serviceTemplateId) {
        return damClient.getConfig(realm, tokens.get(CookieKind.DAM), tokens.get(CookieKind.REFRESH))
            .map(DamService.DamConfig::getServiceTemplatesMap)
            .map(serviceTemplates -> {
                if (!serviceTemplates.containsKey(serviceTemplateId)) {
                    throw new IllegalArgumentException(format("Unrecognized serviceTemplate id [%s]", serviceTemplateId));
                }
                return serviceTemplates.get(serviceTemplateId);
            });
    }

    private Mono<ItemFormat> getItemFormatForServiceTemplate(ReactiveAdminDamClient damClient,
                                                             String realm,
                                                             Map<CookieKind, String> tokens,
                                                             ServiceTemplate serviceTemplate) {
        String targetAdapterId = serviceTemplate.getTargetAdapter();
        String itemFormatId = serviceTemplate.getItemFormat();

        return damClient.getTargetAdapters(realm, tokens.get(CookieKind.DAM), tokens.get(CookieKind.REFRESH))
            .map(targetAdaptersResponse -> {
                TargetAdapter targetAdapter = getDamTargetAdapter(targetAdapterId, targetAdaptersResponse);
                return getDamItemFormat(targetAdapterId, itemFormatId, targetAdapter);
            });
    }

    private ItemFormat getDamItemFormat(String targetAdapterId, String itemFormatId, TargetAdapter targetAdapter) {
        ItemFormat itemFormat = targetAdapter.getItemFormatsMap().get(itemFormatId);
        if (itemFormat == null) {
            throw new IllegalStateException(format(
                "Could not find itemFormat [%s] in targetAdapter [%s] referenced from service template",
                itemFormatId,
                targetAdapterId));
        }
        return itemFormat;
    }

    private TargetAdapter getDamTargetAdapter(String targetAdapterId, TargetAdaptersResponse targetAdaptersResponse) {
        TargetAdapter targetAdapter = targetAdaptersResponse.getTargetAdaptersMap().get(targetAdapterId);
        if (targetAdapter == null) {
            throw new IllegalStateException(format(
                "Could not find targetAdapter [%s] referenced from service template",
                targetAdapterId));
        }
        return targetAdapter;
    }

}
