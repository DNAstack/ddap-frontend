package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamInfo {
    private String name;
    private Map<String, String> ui;
}
