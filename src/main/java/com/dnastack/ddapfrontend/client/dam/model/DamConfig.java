package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamConfig {

    private Map<String, Object> claimDefinitions;
    private Map<String, Object> clients;
    private Map<String, DamPolicy> policies;
    private Map<String, DamResource> resources;
    private Map<String, DamServiceTemplate> serviceTemplates;
    private Map<String, Object> testPersonas;
    private Map<String, Object> trustedPassportIssuers;
    private Map<String, Object> trustedSources;

}
