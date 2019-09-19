import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  newlyCreatedWorkflows?: any[];

  constructor(private router: Router,
              private workflowService: WorkflowService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.newlyCreatedWorkflows = navigation.extras.state.runs;
    }
  }

  ngOnInit(): void {
    this.getWorkflows();
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

}
