package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class View {
    String name;
    String action;
    Map<String, DamInterface> interfaces = new HashMap<>();
}
