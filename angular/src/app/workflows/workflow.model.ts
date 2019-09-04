export interface Workflow {
  runs: WorkflowRun[];
  error: {
    message: string;
  };
  ui: {
    resource: string;
    resourceId: string;
    view: string;
    viewId: string;
  };
}

export interface WorkflowRun {
  run_id: string;
  state: string;
}
