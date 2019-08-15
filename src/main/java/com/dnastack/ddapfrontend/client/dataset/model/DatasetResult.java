package com.dnastack.ddapfrontend.client.dataset.model;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
