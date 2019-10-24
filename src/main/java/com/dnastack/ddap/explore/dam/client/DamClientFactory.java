package com.dnastack.ddap.explore.dam.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

import static java.lang.String.format;

@Component
public class DamClientFactory {

    private Map<String, ReactiveDamClient> damClients;

    @Autowired
    public DamClientFactory(Map<String, ReactiveDamClient> damClients) {
        this.damClients = damClients;
    }

    public ReactiveDamClient getDamClient(String damId) {
        if (!damClients.containsKey(damId)) {
            throw new IllegalArgumentException(format("Unknown damId [%s]", damId));
        }

        return damClients.get(damId);
    }

}
