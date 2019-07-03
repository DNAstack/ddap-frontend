import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';

import { ic } from '../../../../shared/proto/ic-service';
import IdentityProvider = ic.v1.IdentityProvider;
import { FormValidators } from '../../../../shared/validators';
import { PassportTranslatorsService } from '../../../passport-issuers/passport-translators.service';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';
import Form from '../../../shared/form';

@Component({
  selector: 'ddap-identity-provider-form',
  templateUrl: './identity-provider-form.component.html',
  styleUrls: ['./identity-provider-form.component.scss'],

})
export class IdentityProviderFormComponent implements OnInit, Form {

  get scopes() {
    return this.form.get('scopes') as FormArray;
  }

  @Input()
  model?: EntityModel = new EntityModel('', IdentityProvider.create());

  form: FormGroup;

  translators$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private passportTranslators: PassportTranslatorsService,
              private route: ActivatedRoute) {

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
    this.translators$ = this.passportTranslators.get(this.routeDamId());

    this.form = this.formBuilder.group({
      id: [this.model.name || '', [Validators.required, Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [_get(ui, 'label', ''), []],
        description: [_get(ui, 'description', ''), [Validators.maxLength(255)]],
      }),
      issuer: [issuer, [Validators.required]],
      tokenUrl: [tokenUrl, [FormValidators.url]],
      authorizeUrl: [authorizeUrl, [FormValidators.url]],
      clientId: [clientId],
      responseType: [responseType],
      translateUsing: [translateUsing],
      scopes: scopeForm,
    });
  }

  addScope() {
    this.scopes.insert(0, this.formBuilder.control('', [Validators.required]));
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

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }
}
