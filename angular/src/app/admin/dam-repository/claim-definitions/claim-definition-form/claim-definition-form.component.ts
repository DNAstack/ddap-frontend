import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from 'ddap-common-lib';
import { Form } from 'ddap-common-lib';
import { EntityModel, nameConstraintPattern } from 'ddap-common-lib';
import _get from 'lodash.get';

import { dam } from '../../../../shared/proto/dam-service';

import ClaimDefinition = dam.v1.ClaimDefinition;

@Component({
  selector: 'ddap-claim-definition-form',
  templateUrl: './claim-definition-form.component.html',
  styleUrls: ['./claim-definition-form.component.scss'],

})
export class ClaimDefinitionFormComponent implements OnInit, Form {

  @Input()
  claimDefinition?: EntityModel = new EntityModel('', ClaimDefinition.create());

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const { ui } = _get(this.claimDefinition, 'dto', {});

    this.form = this.formBuilder.group({
      id: [this.claimDefinition.name || '', [Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [ui.label || '', [Validators.required]],
        description: [ui.description || '', [Validators.required, Validators.maxLength(255)]],
        infoUrl: [ui.infoUrl || '', [FormValidators.url]],
      }),
    });
  }

  getModel(): EntityModel {
    const { id, ui } = this.form.value;
    const claimDefinition: ClaimDefinition = ClaimDefinition.create({
      ui,
    });

    return new EntityModel(id, claimDefinition);
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

}
