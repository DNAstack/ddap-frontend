package com.dnastack.ddap.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UiMetadata extends JsonConfig {
    private String label;
    private String description;
}
