package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamServiceTemplate {

    String itemFormat;
    String targetAdapter;
    Map<String, Object> interfaces;
    Map<String, Object> roles;
    Map<String, Object> ui;

}
