package com.dnastack.ddap.common;

import lombok.Data;

import java.util.Map;

@Data
public class ServiceTemplate extends JsonConfig {
    private Map<String, RoleDef> roles;
}
