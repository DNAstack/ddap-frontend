package com.dnastack.ddapfrontend.route;

import com.dnastack.ddapfrontend.client.dam.FeignDamClient;
import com.dnastack.ddapfrontend.security.UserTokenCookiePackager;
import dam.v1.DamService;
import dam.v1.DamService.DamConfig;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.format;

@Slf4j
@RestController
@RequestMapping("/api/v1alpha/{realm}/serviceTemplates/variables")
public class ServiceTemplateVariableResolutionController {

    @Autowired
    private FeignDamClient feignDamClient;

    @Autowired
    private UserTokenCookiePackager cookiePackager;

    @GetMapping
    public Map<String, VariableFormat> resolveVariables(@RequestParam(name = "serviceTemplate") String serviceTemplateId, ServerHttpRequest request, @PathVariable String realm) {
        Optional<String> foundDamToken = cookiePackager.extractToken(request, UserTokenCookiePackager.CookieKind.DAM);
        String damToken = foundDamToken.orElseThrow(() -> new IllegalArgumentException("Authorization dam token is required."));
        DamConfig damConfig = feignDamClient.getConfig(damToken, realm);
        final DamService.ServiceTemplate foundServiceTemplate = damConfig.getServiceTemplatesMap().get(serviceTemplateId);

        if (foundServiceTemplate == null) {
            throw new IllegalArgumentException(format("Unrecognized serviceTemplate id [%s]", serviceTemplateId));
        } else {
            final String targetAdapterId = foundServiceTemplate.getTargetAdapter();
            final String itemFormatId = foundServiceTemplate.getItemFormat();

            final DamService.TargetAdaptersResponse targetAdapters = feignDamClient.getTargetAdapters(damToken, realm);
            final DamService.TargetAdapter targetAdapter = targetAdapters.getTargetAdaptersMap().get(targetAdapterId);
            final DamService.ItemFormat itemFormat = Optional.ofNullable(targetAdapter)
                                                             .map(ta -> ta.getItemFormatsMap().get(itemFormatId))
                                                             .orElse(null);

            if (targetAdapter == null) {
                throw new IllegalStateException(format(
                        "Could not find targetAdapter [%s] referenced from service template [%s]",
                        targetAdapterId,
                        serviceTemplateId));
            } else if (itemFormat == null) {
                throw new IllegalStateException(format(
                        "Could not find itemFormat [%s] in targetAdapter [%s] referenced from service template [%s]",
                        itemFormatId,
                        targetAdapterId,
                        serviceTemplateId));
            } else {
                return itemFormat.getVariablesMap()
                                 .entrySet()
                                 .stream()
                                 .collect(Collectors.toMap(Map.Entry::getKey, e -> variableFormatToMap(e.getValue())));
            }
        }
    }

    private VariableFormat variableFormatToMap(DamService.VariableFormat variableFormat) {
        return new VariableFormat(variableFormat.getRegexp(), variableFormat.getOptional(), variableFormat.getUiMap());
    }

    /**
     * This type only exists because I could not configure the Spring MVC serializer to properly serialize
     * the protobuf VariableFormat definition.
     */
    @Data
    @AllArgsConstructor
    static class VariableFormat {
        private String regexp;
        private boolean optional;
        private Map<String, String> ui;
    }

}
