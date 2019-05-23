import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';

import { ic } from '../../../../shared/proto/ic-service';
import { PassportTranslatorsService } from '../../../passport-issuers/passport-translators.service';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';
import Form from '../../../shared/form';
import IdentityProvider = ic.v1.IdentityProvider;

@Component({
  selector: 'ddap-identity-provider-form',
  templateUrl: './identity-provider-form.component.html',
  styleUrls: ['./identity-provider-form.component.scss'],

})
export class IdentityProviderFormComponent implements OnInit, Form {

  @Input()
  model?: EntityModel = new EntityModel('', IdentityProvider.create());

  form: FormGroup;

  translators$: Observable<any>;

  get scopes() {
    return this.form.get('scopes') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private passportTranslators: PassportTranslatorsService) {

  }

  ngOnInit(): void {
    const {
      ui,
      tokenUrl,
      authorizeUrl,
      clientId,
      issuer,
      responseType,
      translateUsing,
      scopes,
    } = _get(this.model, 'dto', {});

    const scopeForm = this.formBuilder.array(scopes || []);
    this.translators$ = this.passportTranslators.get();

    this.form = this.formBuilder.group({
      id: [this.model.name || '', [Validators.required, Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [_get(ui, 'label', ''), []],
        description: [_get(ui, 'description', ''), [Validators.maxLength(255)]],
      }),
      issuer: [issuer],
      tokenUrl: [tokenUrl],
      authorizeUrl: [authorizeUrl],
      clientId: [clientId],
      responseType: [responseType],
      translateUsing: [translateUsing],
      scopes: scopeForm,
    });
  }

  addScope() {
    this.scopes.insert(0, this.formBuilder.control(['']));
  }

  removeScope(index: number): void {
    this.scopes.removeAt(index);
  }

  getModel(): EntityModel {
    const {
      id,
      ui,
      tokenUrl,
      authorizeUrl,
      clientId,
      issuer,
      responseType,
      translateUsing,
      scopes,
    } = this.form.value;

    const identityProvider: IdentityProvider = IdentityProvider.create({
      ui,
      tokenUrl,
      authorizeUrl,
      clientId,
      issuer,
      responseType,
      translateUsing,
      scopes,
    });

    return new EntityModel(id, identityProvider);
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }
}
