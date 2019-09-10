package com.dnastack.ddapfrontend.model.workflow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkflowExecutionRunRequestModel {

    private String wdl;
    private String inputsJson;
    private String tokensJson;

}
