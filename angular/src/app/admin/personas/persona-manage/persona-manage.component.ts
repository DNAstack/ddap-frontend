import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/Observable';

import { dam } from '../../../shared/proto/dam-service';
import { ClaimDefinitionService } from '../../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../../passport-issuers/passport-issuerss.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { urlPattern } from '../../shared/validator.constants';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent implements OnInit {

  personaForm = this.fb.group({
    id: ['', Validators.required],
    label: ['', Validators.required],
    iss: [{value: '', disabled: true}, Validators.required],
    sub: ['', Validators.required],
    standardClaims: this.fb.array([]),
    ga4ghClaims: this.fb.array([]),
  });

  issuers$: Observable<string[]>;
  claimNames$: Observable<string[]>;

  get standardClaims() {
    return this.personaForm.get('standardClaims') as FormArray;
  }

  get ga4ghClaims() {
    return this.personaForm.get('ga4ghClaims') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private passportIssuerService: PassportIssuerService,
              private claimDefinitionService: ClaimDefinitionService,
              private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.claimNames$ = this.claimDefinitionService
      .getList(claimDefinition => claimDefinition.name).pipe(
        tap(() => this.enabledClaimSelects())
      );

    this.issuers$ = this.passportIssuerService
      .getList(issuer => issuer.dto.issuer).pipe(
        tap(() => this.personaForm.controls['iss'].enable())
      );
  }

  removeClaim(index) {
    this.ga4ghClaims.removeAt(index);
  }

  addGa4ghClaims() {
    this.ga4ghClaims.insert(0, this.fb.group({
      claimName: [{value: '', disabled: true}, Validators.required],
      source: ['', Validators.pattern(urlPattern)],
      value: ['', Validators.pattern(urlPattern)],
      iat: ['', [Validators.min(0)]],
      exp: ['', Validators.min(0)],
      by: ['', Validators.minLength(2)],
    }));
  }

  save() {
    const id = this.personaForm.value.id;
    const testPersona: dam.v1.TestPersona = dam.v1.TestPersona.create({
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

  private enabledClaimSelects() {
    const ga4ghClaims: FormArray = <FormArray> this.personaForm.get('ga4ghClaims');
    ga4ghClaims.controls.forEach((control) => control.enable());
  }
}
