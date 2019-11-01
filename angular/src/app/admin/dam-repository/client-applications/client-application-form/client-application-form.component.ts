import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Client = dam.v1.Client;
import { Form } from 'ddap-common-lib';
import { EntityModel, nameConstraintPattern } from 'ddap-common-lib';

import { dam } from '../../../../shared/proto/dam-service';

@Component({
  selector: 'ddap-client-application-form',
  templateUrl: './client-application-form.component.html',
  styleUrls: ['./client-application-form.component.scss'],
})
export class ClientApplicationFormComponent implements OnInit, Form {

  @Input()
  clientApplication?: EntityModel = new EntityModel('', Client.create());

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    const { ui, clientId } = this.clientApplication.dto;
    this.form = this.formBuilder.group({
      id: [this.clientApplication.name || '', [Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [ui.label || '', [Validators.required]],
        description: [ui.description || '', [Validators.required, Validators.maxLength(255)]],
      }),
      clientId: [clientId],
    });
  }

  getModel(): EntityModel {
    const { id, ui } = this.form.value;
    const clientApplication: Client = Client.create({
      ui,
    });

    return new EntityModel(id, clientApplication);
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

}
