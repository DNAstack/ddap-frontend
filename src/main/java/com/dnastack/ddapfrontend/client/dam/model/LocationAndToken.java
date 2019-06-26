package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

@Data
public class LocationAndToken {
    private String name;
    private DamView view;
    private String account;
    private String token;
    private String ttl;
}
