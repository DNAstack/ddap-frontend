package com.dnastack.ddap.common;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;

public abstract class JsonConfig {
    @JsonAnySetter
    private Map<String, Object> others = new HashMap<>();

    @JsonAnyGetter
    public Map<String, Object> getOthers() {
        return others;
    }
}
