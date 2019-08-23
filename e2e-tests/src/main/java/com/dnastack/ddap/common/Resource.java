package com.dnastack.ddap.common;

import lombok.Data;

import java.util.Map;

@Data
public class Resource extends JsonConfig {
    private Map<String, View> views;
}
