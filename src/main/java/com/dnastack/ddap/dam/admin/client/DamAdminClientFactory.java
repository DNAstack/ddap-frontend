package com.dnastack.ddap.dam.admin.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

import static java.lang.String.format;

@Component
public class DamAdminClientFactory {

    private Map<String, ReactiveAdminDamClient> damClients;

    @Autowired
    public DamAdminClientFactory(Map<String, ReactiveAdminDamClient> damClients) {
        this.damClients = damClients;
    }

    public ReactiveAdminDamClient getDamClient(String damId) {
        if (!damClients.containsKey(damId)) {
            throw new IllegalArgumentException(format("Unknown damId [%s]", damId));
        }

        return damClients.get(damId);
    }

}
