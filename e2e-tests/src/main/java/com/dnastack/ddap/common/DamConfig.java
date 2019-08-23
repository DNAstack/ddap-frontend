package com.dnastack.ddap.common;

import lombok.Data;

import java.util.Map;

@Data
public class DamConfig extends JsonConfig {
    private Map<String, ServiceTemplate> serviceTemplates;
    private Map<String, Resource> resources;
}
