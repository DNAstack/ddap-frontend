package com.dnastack.ddapfrontend.model.workflow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkflowExecutionRunsResponseModel {

    private List<WorkflowExecutionRunModel> runs;
    private WorkflowUi ui;
    private WorkflowRequestError error;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkflowUi {
        private String resource;
        private String resourceId;
        private String view;
        private String viewId;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkflowRequestError {
        private String message;
        private Integer status;
    }

}
