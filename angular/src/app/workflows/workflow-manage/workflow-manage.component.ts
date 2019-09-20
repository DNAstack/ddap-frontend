import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _cloneDeep from 'lodash.clonedeep';
import _get from 'lodash.get';
import { Observable, zip } from 'rxjs';

import Form from '../../admin/shared/form/form';
import { FormValidationService } from '../../admin/shared/form/form-validation.service';
import { DatasetFormComponent } from '../dataset-form/dataset-form.component';
import { WorkflowFormComponent } from '../workflow-form/workflow-form.component';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-manage',
  templateUrl: './workflow-manage.component.html',
  styleUrls: ['./workflow-manage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkflowManageComponent {

  @ViewChild(DatasetFormComponent, { static: false })
  datasetForm: DatasetFormComponent;
  @ViewChild(WorkflowFormComponent, { static: false })
  workflowForm: WorkflowFormComponent;

  formErrorMessage: string;
  isFormValid: boolean;
  isFormValidated: boolean;

  datasetColumns: string[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private validationService: FormValidationService,
              private workflowService: WorkflowService) {
  }

  datasetColumnsChange(columns) {
    this.datasetColumns = columns;
  }

  executeWorkflows(): void {
    if (!this.validate(this.workflowForm)) {
      return;
    }

    const damId = this.workflowForm.getDamId();
    const wesView = this.workflowForm.form.get('wesView').value;
    const wdl = this.workflowForm.form.get('wdl').value;
    // TODO: make tokens relevant to single run -> instead of all tokens, just tokens which are needed for particular run
    const tokens = JSON.stringify(this.datasetForm.getTokensModel());

    if (this.datasetForm.selectedData && this.datasetForm.selectedData.length > 0) {
      zip(...this.datasetForm.selectedData
        .map((row) => this.executeWorkflowForSingleRow(row, damId, wesView, wdl, tokens))
      ).subscribe((runs: object[]) => this.navigateUp('../..', runs, damId, wesView), this.showError);
    } else {
      const inputs = this.workflowForm.form.get('inputs').value;
      this.workflowService.runWorkflow(damId, wesView, wdl, JSON.stringify(inputs), tokens)
        .subscribe((run) => this.navigateUp('../..', [run], damId, wesView), this.showError);
    }
  }

  protected navigateUp = (path: string, runs: object[], damId, wesView) => {
    const { viewId } = this.route.snapshot.params;
    const navigatePath = viewId
                          ? [path]
                          : [path, damId, 'views', wesView, 'runs'];
    this.router.navigate(navigatePath, { relativeTo: this.route, state: { runs } });
  }

  protected showError = ({ error }: HttpErrorResponse) => {
    this.formErrorMessage = (error instanceof Object) ? JSON.stringify(error) : error;
    this.isFormValid = false;
    this.isFormValidated = true;
  }

  private executeWorkflowForSingleRow(row, damId, wesView, wdl, tokens): Observable<any> {
    const inputs = _cloneDeep(this.workflowForm.form.get('inputs').value);
    this.substituteColumnNamesWithValues(inputs, row);
    return this.workflowService.runWorkflow(damId, wesView, wdl, JSON.stringify(inputs), tokens);
  }

  private substituteColumnNamesWithValues(object: object, row: object) {
    Object.entries(object).forEach(([key, value]) => {
      switch (typeof object[key]) {
        case 'object':
          this.substituteColumnNamesWithValues(object[key], row); break;
        case 'string':
          if (value.startsWith('${') && value.endsWith('}')) {
            object[key] = _get(row, value.substring(2, value.length - 1), '');
          }
      }
    });
  }

  private validate(form: Form): boolean {
    this.formErrorMessage = null;
    this.isFormValid = this.validationService.validate(form);
    this.isFormValidated = true;
    return this.isFormValid;
  }

}
