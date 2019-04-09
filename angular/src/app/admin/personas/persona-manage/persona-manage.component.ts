import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../shared/proto/dam-service';
import { ClaimDefinitionService } from '../../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../../passport-issuers/passport-issuerss.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { PersonaService } from '../personas.service';
import TestPersona = dam.v1.TestPersona;

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent implements OnInit {

  personaForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.min(3)]],
    label: [''],
    iss: ['', Validators.required],
    sub: ['', Validators.required],
    standardClaims: this.formBuilder.array([]),
    ga4ghClaims: this.formBuilder.array([]),
  });

  get standardClaims() {
    return this.personaForm.get('standardClaims') as FormArray;
  }

  get ga4ghClaims() {
    return this.personaForm.get('ga4ghClaims') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private passportIssuerService: PassportIssuerService,
              private claimDefinitionService: ClaimDefinitionService,
              private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  removeClaim(index) {
    this.ga4ghClaims.removeAt(index);
  }

  addGa4ghClaims() {
    this.ga4ghClaims.insert(0, this.formBuilder.group({
      claimName: ['', Validators.required],
      source: ['', Validators.required],
      value: ['', Validators.required],
      iat: ['', Validators.required],
      exp: ['', Validators.required],
      by: ['', Validators.required],
    }));
  }

  save() {
    const id = this.personaForm.value.id;
    const testPersona: TestPersona = TestPersona.create({
      idToken: {
        standardClaims: {
          iss: this.personaForm.value.iss,
          sub: this.personaForm.value.sub,
        },
        ga4ghClaims: this.personaForm.value.ga4ghClaims,
      },
      ui: {
        label: this.personaForm.value.label,
      },
    });

    this.personaService.save(id, new ConfigModificationObject(testPersona, {}))
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
