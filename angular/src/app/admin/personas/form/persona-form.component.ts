import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';

import { dam } from '../../../shared/proto/dam-service';
import { EntityModel } from '../../shared/entity.model';
import TestPersona = dam.v1.TestPersona;

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
})
export class PersonaFormComponent implements OnChanges {

  @Input()
  persona?: TestPersona = TestPersona.create();

  personaForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.min(3)]],
    label: [''],
    iss: ['', Validators.required],
    sub: ['', Validators.required],
    ga4ghClaims: this.formBuilder.array([]),
  });

  get standardClaims() {
    return this.personaForm.get('standardClaims') as FormArray;
  }

  get ga4ghClaims() {
    return this.personaForm.get('ga4ghClaims') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnChanges({persona}: SimpleChanges): void {
    const personaId: string = _get(persona, 'currentValue.name');

    if (!personaId) {
      return;
    }

    const personaDto: TestPersona = _get(persona, 'currentValue.dto');
    const standardClaims = _get(personaDto, 'idToken.standardClaims');
    const ga4ghClaims: TestPersona.IGA4GHClaim[] = _get(personaDto, 'idToken.ga4ghClaims', []);

    this.personaForm = this.formBuilder.group({
      id: [{value: personaId, disabled: true}, [Validators.required, Validators.min(3)]],
      label: [personaDto.ui.label],
      iss: [standardClaims.iss, Validators.required],
      sub: [standardClaims.sub, Validators.required],
      ga4ghClaims: this.formBuilder.array(
        ga4ghClaims.map((claim) => this.buildGa4GhClaimGroup(claim))
      ),
    });
  }

  removeClaim(index) {
    this.ga4ghClaims.removeAt(index);
  }

  addGa4ghClaims() {
    this.ga4ghClaims.insert(0, this.buildGa4GhClaimGroup({}));
  }

  getEntityModel(): EntityModel {

    const { id, iss, sub, ga4ghClaims, label } = this.personaForm.value;

    const testPersona: TestPersona = TestPersona.create({
      idToken: {
        standardClaims: {
          iss,
          sub,
        },
        ga4ghClaims,
      },
      ui: {
        label,
      },
    });

    return new EntityModel(id, testPersona);
  }

  private buildGa4GhClaimGroup({claimName, source, value, iat, exp, by}: TestPersona.IGA4GHClaim): FormGroup {
    return this.formBuilder.group({
      claimName: [claimName, Validators.required],
      source: [source, Validators.required],
      value: [value, Validators.required],
      iat: [iat, Validators.required],
      exp: [exp, Validators.required],
      by: [by, Validators.required],
    });
  }
}
