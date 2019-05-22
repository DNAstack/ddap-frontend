import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';

import Client = dam.v1.Client;
import { dam } from '../../../../shared/proto/dam-service';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';

@Component({
  selector: 'ddap-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {

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
        label: [_get(ui, 'label', '')],
        description: [_get(ui, 'description', ''), [Validators.maxLength(255)]],
      }),
      clientId: [clientId],
      redirectUris: redirectUrisForm,
    });
  }

  addRedirectUri() {
    this.redirectUris.insert(0, this.formBuilder.control(['']));
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

}
