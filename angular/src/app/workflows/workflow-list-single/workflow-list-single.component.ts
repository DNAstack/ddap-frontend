import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkflowRunsResponse } from '../workflow.model';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-list-single',
  templateUrl: './workflow-list-single.component.html',
  styleUrls: ['./workflow-list-single.component.scss'],
})
export class WorkflowListSingleComponent implements OnInit {

  workflowRunsResponse: WorkflowRunsResponse;

  newlyCreatedWorkflows?: any[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private workflowService: WorkflowService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.newlyCreatedWorkflows = navigation.extras.state.runs;
    }
  }

  ngOnInit(): void {
    this.getWorkflows();
  }

  private redirectToPage(pageToken: string) {
    // console.log(pageToken);
    // TODO
  }

  private getWorkflows() {
    const { damId, viewId } = this.route.snapshot.params;
    this.workflowService.getWorkflowRuns(damId, viewId)
      .subscribe((workflowRunsResponse: WorkflowRunsResponse) => {
        this.workflowRunsResponse = workflowRunsResponse;
      });
  }

}
