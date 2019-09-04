package com.dnastack.ddapfrontend.model.workflow;

import dam.v1.DamService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WesResourceViews {

    private String damId;
    private Map.Entry<String, DamService.Resource> resource;
    private List<Map.Entry<String, DamService.View>> views;

}
