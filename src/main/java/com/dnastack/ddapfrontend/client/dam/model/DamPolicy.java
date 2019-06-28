package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamPolicy {

    private DamCondition allow;
    private DamCondition disallow;
    private Map<String, Object> ui;

}
