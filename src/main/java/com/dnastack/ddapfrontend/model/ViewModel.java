package com.dnastack.ddapfrontend.model;

import lombok.Data;

import java.util.Map;

@Data
public class ViewModel {

    private String serviceTemplate;
    private Map<String, InterfaceModel> interfaces;
    private Map<String, String> ui;

    public String getLabel() {
        if (ui == null) {
            return null;
        }
        return ui.get("label");
    }
}
