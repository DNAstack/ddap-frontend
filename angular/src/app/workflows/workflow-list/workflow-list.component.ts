import { Component, OnInit } from '@angular/core';

import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent {

  constructor(public workflowService: WorkflowService) {
  }

}
