import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { WorkflowFormComponent } from '../workflow-form/workflow-form.component';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-manage',
  templateUrl: './workflow-manage.component.html',
  styleUrls: ['./workflow-manage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkflowManageComponent {

  @ViewChild(WorkflowFormComponent, { static: false })
  workflowForm: WorkflowFormComponent;

  constructor(private workflowService: WorkflowService) {
  }

  executeWorkflow(): void {
    const damId = this.workflowForm.getDamId();
    const wesView = this.workflowForm.form.get('wesView').value;
    const wdl = this.workflowForm.form.get('wdl').value;
    const inputs = this.workflowForm.form.get('inputs').value;
    this.workflowService.runWorkflow(damId, wesView, wdl, inputs)
      .subscribe();
  }

}
