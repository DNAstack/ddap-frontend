import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Observable } from 'rxjs';

import { pick } from '../../../../shared/autocomplete/autocomplete.util';
import { dam } from '../../../../shared/proto/dam-service';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';
import Form from '../../../shared/form/form';
import TrustedPassportIssuer = dam.v1.TrustedPassportIssuer;
import { PassportTranslatorsService } from '../../passport-translators/passport-translators.service';
import { PassportIssuersStore } from '../passport-issuers.store';

@Component({
  selector: 'ddap-passport-issuer-form',
  templateUrl: './passport-issuer-form.component.html',
  styleUrls: ['./passport-issuer-form.component.scss'],

})
export class PassportIssuerFormComponent implements OnInit, Form {

  @Input()
  passportIssuer?: EntityModel = new EntityModel('', TrustedPassportIssuer.create());

  form: FormGroup;

  passportIssuers$: Observable<any>;
  translators$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private passportTranslators: PassportTranslatorsService,
              private passportIssuersStore: PassportIssuersStore,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const { ui, issuer, translateUsing } = _get(this.passportIssuer, 'dto', {});

    this.translators$ = this.passportTranslators.get(this.routeDamId());

    this.form = this.formBuilder.group({
      id: [this.passportIssuer.name || '', [Validators.required, Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [_get(ui, 'label', ''), []],
        description: [_get(ui, 'description', ''), [Validators.required, Validators.maxLength(255)]],
      }),
      issuer: [issuer, Validators.required],
      translateUsing: [translateUsing],
    });

    this.passportIssuers$ = this.passportIssuersStore.getAsList(this.routeDamId(), pick('dto.issuer'));
  }

  getModel(): EntityModel {
    const {id, ui, issuer, translateUsing} = this.form.value;
    const clientApplication: TrustedPassportIssuer = TrustedPassportIssuer.create({
      ui,
      issuer,
      translateUsing,
    });

    return new EntityModel(id, clientApplication);
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
