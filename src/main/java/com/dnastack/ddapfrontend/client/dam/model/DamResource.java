package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class DamResource {

    private Map<String, DamView> views = new HashMap<>();
    private List<String> clients = new ArrayList<>();
    private String maxTokenTtl;
    private Map<String, String> ui;

    public String getLabel() {
        return (ui != null) ? this.ui.get("label"): null;
    }

}
