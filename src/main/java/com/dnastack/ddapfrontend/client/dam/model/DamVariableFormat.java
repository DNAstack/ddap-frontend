package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamVariableFormat {

    String regexp;
    Boolean optional;
    Map<String, String> ui;

}
