import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';

import { JsonEditorDefaults } from '../../admin/dam-repository/shared/jsonEditorDefaults';
import Form from '../../admin/shared/form/form';
import { SimplifiedWesResourceViews } from '../workflow.model';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-form',
  templateUrl: './workflow-form.component.html',
  styleUrls: ['./workflow-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkflowFormComponent implements Form, OnInit {

  form: FormGroup;
  wesResourceViews: SimplifiedWesResourceViews[];
  editorOptions: JsonEditorOptions;

  constructor(private formBuilder: FormBuilder,
              private workflowService: WorkflowService) {
    this.editorOptions = new JsonEditorDefaults();
    this.editorOptions.mode = 'code';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      wesView: ['', [Validators.required]],
      wdl: ['', [Validators.required]],
      inputs: ['', [Validators.required]],
    });

    this.workflowService.getAllWesViews()
      .subscribe((sanitizedWesResourceViews: SimplifiedWesResourceViews[]) => {
        this.wesResourceViews = sanitizedWesResourceViews;
      });
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getDamId(): string {
    return this.wesResourceViews.find((wesResourceViews: SimplifiedWesResourceViews) => {
      return wesResourceViews.views.some((view) => view.name === this.form.get('wesView').value);
    }).damId;
  }

}
