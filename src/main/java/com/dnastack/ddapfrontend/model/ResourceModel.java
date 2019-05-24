package com.dnastack.ddapfrontend.model;

import lombok.Data;

import java.util.Map;

@Data
public class ResourceModel {

    private String maxTokenTtl;
    private Map<String, String> ui;
    private Map<String, ViewModel> views;

    public String getLabel() {
        return (ui != null) ? this.ui.get("label"): null;
    }

}
