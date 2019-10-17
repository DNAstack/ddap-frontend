package com.dnastack.ddap.explore.wes.client.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WdlDescribeRequestModel {

    private String uri;
    private List<WdlDescribeDependencyRequestModel> dependencies;

}
