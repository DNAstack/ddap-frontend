package com.dnastack.ddapfrontend.client.dam.model;

import com.dnastack.ddapfrontend.model.InterfaceModel;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class DamView {

    private String serviceTemplate;
    private String version;
    private String topic;
    private String partition;
    private String fidelity;
    private String geoLocation;
    private String defaultRole;
    private List<String> contentTypes = new ArrayList<>();
    private Map<String, InterfaceModel> interfaces = new HashMap<>();
    private Map<String, DamAccessRole> roles = new HashMap<>();
    private Map<String, String> ui;

    public String getLabel() {
        if (ui == null) {
            return null;
        }
        return ui.get("label");
    }
}
