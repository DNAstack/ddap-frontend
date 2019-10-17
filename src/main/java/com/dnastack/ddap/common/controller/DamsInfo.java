package com.dnastack.ddap.common.controller;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DamsInfo {

    private Map<String, DamInfo> dams;

    @JsonAnyGetter
    public Map<String, DamInfo> getDams() {
        return dams;
    }
}
