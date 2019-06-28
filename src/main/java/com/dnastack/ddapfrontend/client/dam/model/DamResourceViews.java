package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamResourceViews {

    private Map<String, DamView> views;

}
