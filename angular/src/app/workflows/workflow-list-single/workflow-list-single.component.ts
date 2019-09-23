import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginationTypes } from '../../shared/paginator/pagination-type.enum';
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
  paginationType = PaginationTypes.unidirectional;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workflowService: WorkflowService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.newlyCreatedWorkflows = navigation.extras.state.runs;
    }
  }

  ngOnInit(): void {
    this.getWorkflows();
  }

  private getWorkflows(pageToken?: string) {
    const { damId, viewId } = this.route.snapshot.params;
    this.workflowService.getWorkflowRuns(damId, viewId, pageToken)
      .subscribe((workflowRunsResponse: WorkflowRunsResponse) => {
        this.workflowRunsResponse = workflowRunsResponse;
      });
  }

}
