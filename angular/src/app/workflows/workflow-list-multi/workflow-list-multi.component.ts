import { Component, OnInit } from '@angular/core';

import { SimplifiedWesResourceViews } from '../workflow.model';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-list-multi',
  templateUrl: './workflow-list-multi.component.html',
  styleUrls: ['./workflow-list-multi.component.scss'],
})
export class WorkflowListMultiComponent implements OnInit {

  wesResourceViews: SimplifiedWesResourceViews[];

  constructor(private workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.workflowService.getAllWesViews()
      .subscribe((wesResourceViews: SimplifiedWesResourceViews[]) => {
        this.wesResourceViews = wesResourceViews;
      });
  }

}
