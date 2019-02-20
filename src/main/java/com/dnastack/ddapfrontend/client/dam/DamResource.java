package com.dnastack.ddapfrontend.client.dam;

import lombok.Data;

import java.util.Map;

@Data
public class DamResource {
    Map<String, DamView> views;
}
