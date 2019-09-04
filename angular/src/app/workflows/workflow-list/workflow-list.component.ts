import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(public workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.workflowSubscription = this.workflowService.get()
      .subscribe((workflows: Workflow[]) => {
        this.workflows = workflows;
      });
  }

  ngOnDestroy(): void {
    this.workflowSubscription.unsubscribe();
  }

}
