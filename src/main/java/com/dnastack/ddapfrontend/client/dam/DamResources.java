package com.dnastack.ddapfrontend.client.dam;

import com.dnastack.ddapfrontend.model.ResourceModel;
import lombok.Data;

import java.util.Map;

@Data
public class DamResources {

    Map<String, ResourceModel> resources;

}
