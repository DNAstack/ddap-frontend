package com.dnastack.ddapfrontend.client.dam.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DamCondition {

    private String claim;
    private String dataUse;
    private String userList;
    private String is;
    private List<String> values = new ArrayList<>();
    private List<String> from = new ArrayList<>();
    private List<String> by = new ArrayList<>();
    private List<DamCondition> allTrue = new ArrayList<>();
    private List<DamCondition> anyTrue = new ArrayList<>();

}
