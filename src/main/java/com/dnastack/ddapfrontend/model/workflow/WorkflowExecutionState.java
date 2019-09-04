package com.dnastack.ddapfrontend.model.workflow;

public enum WorkflowExecutionState {

    UNKNOWN,
    QUEUED,
    INITIALIZING,
    RUNNING,
    PAUSED,
    COMPLETE,
    EXECUTOR_ERROR,
    SYSTEM_ERROR,
    CANCELED,
    CANCELING;

}
