package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DamAccessRole {

    private List<String> policies = new ArrayList<>();

}
