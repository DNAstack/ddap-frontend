import { Component } from '@angular/core';

import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-manage',
  templateUrl: './workflow-manage.component.html',
  styleUrls: ['./workflow-manage.component.scss'],
})
export class WorkflowManageComponent {

  constructor(public workflowService: WorkflowService) {
  }



}
