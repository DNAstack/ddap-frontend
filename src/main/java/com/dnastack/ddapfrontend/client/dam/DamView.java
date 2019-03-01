package com.dnastack.ddapfrontend.client.dam;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class DamView {
    String name;
    String action;
    Map<String, String> interfaces = new HashMap<>();
}
