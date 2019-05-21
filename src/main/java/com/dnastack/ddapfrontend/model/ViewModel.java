package com.dnastack.ddapfrontend.model;

import lombok.Data;

import java.util.Map;

@Data
public class ViewModel {

    private String serviceTemplate;
    private Map<String, InterfaceModel> interfaces;

}
