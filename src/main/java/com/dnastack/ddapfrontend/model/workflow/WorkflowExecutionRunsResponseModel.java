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
public class WorkflowExecutionRunsResponseModel {

    private List<WorkflowExecutionRunModel> runs;
    private String damId;
    private String resourceId;
    private String viewId;
    private String wesUrl;
    private WorkflowUi ui;
    private WorkflowRequestError error;
    @JsonProperty(value = "next_page_token")
    private String nextPageToken;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkflowUi {
        private String resource;
        private String view;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkflowRequestError {
        private String message;
        private Integer status;
    }

}
