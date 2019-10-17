package com.dnastack.ddap.explore.wes.model;

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
