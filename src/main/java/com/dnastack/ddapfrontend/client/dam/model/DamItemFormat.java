package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamItemFormat {

    private Map<String, DamVariableFormat> variables;

}
