import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Form from '../../admin/shared/form/form';
import { FormValidationService } from '../../admin/shared/form/form-validation.service';
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

  formErrorMessage: string;
  isFormValid: boolean;
  isFormValidated: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private validationService: FormValidationService,
              private workflowService: WorkflowService) {
  }

  executeWorkflow(): void {
    if (!this.validate(this.workflowForm)) {
      return;
    }

    const damId = this.workflowForm.getDamId();
    const wesView = this.workflowForm.form.get('wesView').value;
    const wdl = this.workflowForm.form.get('wdl').value;
    const inputs = this.workflowForm.form.get('inputs').value;
    this.workflowService.runWorkflow(damId, wesView, wdl, inputs)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

  protected navigateUp = (path: string) => this.router.navigate([path], { relativeTo: this.route });

  protected showError = ({ error }: HttpErrorResponse) => {
    this.formErrorMessage = (error instanceof Object) ? JSON.stringify(error) : error;
    this.isFormValid = false;
    this.isFormValidated = true;
  }

  private validate(form: Form): boolean {
    this.formErrorMessage = null;
    this.isFormValid = this.validationService.validate(form);
    this.isFormValidated = true;
    return this.isFormValid;
  }

}
