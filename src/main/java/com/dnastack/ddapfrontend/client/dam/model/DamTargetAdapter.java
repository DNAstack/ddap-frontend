package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.Map;

@Data
public class DamTargetAdapter {

    private Map<String, DamItemFormat> itemFormats;

}
