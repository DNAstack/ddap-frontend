package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamServiceTemplate {

    private String itemFormat;
    private String targetAdapter;
    private Map<String, Object> interfaces;
    private Map<String, Object> roles;
    private Map<String, Object> ui;

}
