import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';

import { ic } from '../../../../shared/proto/ic-service';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';
import Client = ic.v1.Client;
import Form from '../../../shared/form';

@Component({
  selector: 'ddap-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements Form, OnInit {

  @Input()
  model?: EntityModel = new EntityModel('', Client.create());

  form: FormGroup;

  get redirectUris() {
    return this.form.get('redirectUris') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    const { ui, clientId, redirectUris } = this.model.dto;
    const redirectUrisForm = this.formBuilder.array(redirectUris || []);

    this.form = this.formBuilder.group({
      id: [this.model.name || '', [Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [_get(ui, 'label', ''), [Validators.required]],
        description: [_get(ui, 'description', ''), [Validators.required, Validators.maxLength(255)]],
      }),
      clientId: [clientId, [Validators.required]],
      redirectUris: redirectUrisForm,
    });
  }

  addRedirectUri() {
    this.redirectUris.insert(0, this.formBuilder.control('', [Validators.required]));
  }

  removeRedirectUri(index: number): void {
    this.redirectUris.removeAt(index);
  }

  getModel(): EntityModel {
    const { id, clientId, ui, redirectUris } = this.form.value;
    const clientApplication: Client = Client.create({
      clientId,
      ui,
      redirectUris,
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
