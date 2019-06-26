package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamConfig {

    Map<String, Object> claimDefinitions;
    Map<String, Object> clients;
    Map<String, Object> policies;
    Map<String, DamResource> resources;
    Map<String, DamServiceTemplate> serviceTemplates;
    Map<String, Object> testPersonas;
    Map<String, Object> trustedPassportIssuers;
    Map<String, Object> trustedSources;

}
