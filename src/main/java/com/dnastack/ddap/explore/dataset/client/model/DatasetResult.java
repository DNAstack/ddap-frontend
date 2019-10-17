package com.dnastack.ddap.explore.dataset.client.model;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class DatasetResult {

    List<Map<String, Object>> objects;

    Map<String, String> pagination;

    Map<String, Object> schema;
}
