package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.DamClientFactory;
import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.config.Dam;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import dam.v1.DamService;
import dam.v1.DamService.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Set;

import static com.dnastack.ddapfrontend.security.UserTokenCookiePackager.CookieKind;
import static java.lang.String.format;

@RestController
@RequestMapping(value = "/api/v1alpha/{realm}/serviceTemplates")
public class ServiceTemplateController {

    private UserTokenCookiePackager cookiePackager;
    private DamClientFactory damClientFactory;
    private Map<String, Dam> dams;

    @Autowired
    public ServiceTemplateController(UserTokenCookiePackager cookiePackager,
                                     DamClientFactory damClientFactory,
                                     @Qualifier("dams") Map<String, Dam> dams) {
        this.cookiePackager = cookiePackager;
        this.damClientFactory = damClientFactory;
        this.dams = dams;
    }

    /*
     * Temporary hack while we work on DISCO-2276
     */
    @GetMapping(value = "variables")
    public Mono<Map<String, VariableFormat>> resolveVariables(@PathVariable String realm,
        @RequestParam(name = "serviceTemplate") String serviceTemplateId,
        ServerHttpRequest request) {
        if (dams.size() != 1) {
            throw new IllegalArgumentException("Must specify DAM ID when more than one DAM is configured.");
        }

        return resolveVariables(realm, dams.keySet().iterator().next(), serviceTemplateId, request);
    }

    @GetMapping(value = "{damId}/variables")
    public Mono<Map<String, VariableFormat>> resolveVariables(@PathVariable String realm,
        @PathVariable String damId,
        @RequestParam(name = "serviceTemplate") String serviceTemplateId,
        ServerHttpRequest request) {
        Map<CookieKind, String> tokens = cookiePackager.extractRequiredTokens(request, Set.of(CookieKind.DAM, CookieKind.REFRESH));
        final ReactiveDamClient damClient = damClientFactory.getDamClient(damId);

        return getServiceTemplate(damClient, realm, tokens, serviceTemplateId)
            .flatMap(serviceTemplate -> getItemFormatForServiceTemplate(damClient, realm, tokens, serviceTemplate)
                .map(ItemFormat::getVariablesMap));
    }


    @GetMapping(value = "{damId}/targetAdapters")
    public Mono<Map<String, TargetAdapter>> targetAdapters( @PathVariable String realm,
                                                            @PathVariable String damId,
                                                            ServerHttpRequest request) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        Optional<String> foundRefreshToken = cookiePackager
                .extractToken(request, UserTokenCookiePackager.CookieKind.REFRESH);
        String damToken = foundDamToken
                .orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        String refreshToken = foundRefreshToken
                .orElseThrow(() -> new IllegalArgumentException("Authorization refresh token is required."));

        final ReactiveDamClient damClient = damClientFactory.getDamClient(damId);

        return damClient.getTargetAdapters(realm, damToken, refreshToken)
                .map(targetAdaptersResponse ->
                        targetAdaptersResponse.getTargetAdaptersMap()
                );
    }

    private Mono<ServiceTemplate> getServiceTemplate(ReactiveDamClient damClient,
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

    private Mono<ItemFormat> getItemFormatForServiceTemplate(ReactiveDamClient damClient,
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
