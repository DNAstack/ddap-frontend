package com.dnastack.ddap.common;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class View extends JsonConfig {
    private Map<String, RoleBind> roles;
    private List<Item> items;
    private String defaultRole;
}
