package com.dnastack.ddap.common;

import lombok.Data;

import java.util.Map;

@Data
public class Item extends JsonConfig {
    private Map<String, String> vars;
}
