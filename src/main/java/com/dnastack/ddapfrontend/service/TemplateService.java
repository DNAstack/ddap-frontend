package com.dnastack.ddapfrontend.service;

import com.dnastack.ddapfrontend.client.dam.ReactiveDamClient;
import com.dnastack.ddapfrontend.client.dam.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import static java.lang.String.format;

@Service
public class TemplateService {

    private ReactiveDamClient damClient;

    @Autowired
    public TemplateService(ReactiveDamClient damClient) {
        this.damClient = damClient;
    }

    public Mono<DamServiceTemplate> getServiceTemplate(String realm, String damToken, String serviceTemplateId) {
        return damClient.getConfig(realm, damToken)
                .map(DamConfig::getServiceTemplates)
                .map(serviceTemplates -> {
                    if (!serviceTemplates.containsKey(serviceTemplateId)) {
                        throw new IllegalArgumentException(format("Unrecognized serviceTemplate id [%s]", serviceTemplateId));
                    }
                    return serviceTemplates.get(serviceTemplateId);
                });
    }

    public Mono<DamItemFormat> getItemFormatForServiceTemplate(String realm, String damToken, DamServiceTemplate serviceTemplate) {
        String targetAdapterId = serviceTemplate.getTargetAdapter();
        String itemFormatId = serviceTemplate.getItemFormat();

        return damClient.getTargetAdapters(realm, damToken)
                .map(targetAdaptersResponse -> {
                    DamTargetAdapter targetAdapter = getDamTargetAdapter(targetAdapterId, targetAdaptersResponse);
                    return getDamItemFormat(targetAdapterId, itemFormatId, targetAdapter);
                });
    }

    private DamItemFormat getDamItemFormat(String targetAdapterId, String itemFormatId, DamTargetAdapter targetAdapter) {
        DamItemFormat itemFormat = targetAdapter.getItemFormats().get(itemFormatId);
        if (itemFormat == null) {
            throw new IllegalStateException(format(
                    "Could not find itemFormat [%s] in targetAdapter [%s] referenced from service template",
                    itemFormatId,
                    targetAdapterId));
        }
        return itemFormat;
    }

    private DamTargetAdapter getDamTargetAdapter(String targetAdapterId, DamTargetAdapters targetAdaptersResponse) {
        DamTargetAdapter targetAdapter = targetAdaptersResponse.getTargetAdapters().get(targetAdapterId);
        if (targetAdapter == null) {
            throw new IllegalStateException(format(
                    "Could not find targetAdapter [%s] referenced from service template",
                    targetAdapterId));
        }
        return targetAdapter;
    }

}
