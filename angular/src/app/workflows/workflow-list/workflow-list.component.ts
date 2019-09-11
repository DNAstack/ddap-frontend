import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Workflow } from '../workflow.model';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit, OnDestroy {

  workflows: Workflow[];
  workflowSubscription: Subscription;

  newlyCreatedWorkflowId?: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private workflowService: WorkflowService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.newlyCreatedWorkflowId = navigation.extras.state.runId;
    }
  }

  ngOnInit(): void {
    this.getWorkflows();
    if (this.newlyCreatedWorkflowId) {
      this.notifyAboutNewWorkflow();
    }
  }

  ngOnDestroy(): void {
    this.workflowSubscription.unsubscribe();
  }

  private getWorkflows() {
    if (this.workflowSubscription) {
      this.workflowSubscription.unsubscribe();
    }
    this.workflowSubscription = this.workflowService.getAllWorkflowRuns()
      .subscribe((workflows: Workflow[]) => {
        this.workflows = workflows;
      });
  }

  private notifyAboutNewWorkflow() {
    const message = `Your workflow ID is ${this.newlyCreatedWorkflowId}. If you can't see it refresh the data.`;
    const snackBarRef = this.snackBar.open(message, 'Refresh', {
      duration: 8000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.getWorkflows();
    });
  }

}
