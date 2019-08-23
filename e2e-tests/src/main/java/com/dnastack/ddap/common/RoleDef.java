package com.dnastack.ddap.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RoleDef extends JsonConfig {
    private List<String> targetScopes;
    private List<String> damRoleCategories;
    private UiMetadata ui;
}
