package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamVariableFormat {

    private String regexp;
    private Boolean optional;
    private Map<String, String> ui;

}
