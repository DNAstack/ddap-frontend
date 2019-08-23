package com.dnastack.ddap.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RoleBind extends JsonConfig {
    private List<String> policies;
}
