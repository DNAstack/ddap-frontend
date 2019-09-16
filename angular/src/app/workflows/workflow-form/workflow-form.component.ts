import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoneComponent } from 'angular7-json-schema-form';

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
  inputSchema;
  widgets = {
    submit: NoneComponent,
  };

  constructor(private formBuilder: FormBuilder,
              private workflowService: WorkflowService) {
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

  generateForm() {
    this.workflowService.getJsonSchemaFromWdl(this.form.get('wdl').value)
      .subscribe(({ input_schema: inputSchema }) => {
        this.inputSchema = inputSchema;
      });
  }

  inputFormChange(inputs) {
    this.form.get('inputs').setValue(inputs);
  }

}
