package com.dnastack.ddapfrontend.model.workflow;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkflowExecutionRunModel {

    @JsonProperty(value = "run_id")
    private String runId;
    private WorkflowExecutionState state;
    private Object request;
    private Object outputs;
    @JsonProperty(value = "run_log")
    private Object runLog;
    @JsonProperty(value = "task_logs")
    private List<Object> taskLogs;

}
