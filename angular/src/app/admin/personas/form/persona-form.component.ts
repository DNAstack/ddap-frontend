import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { filterSource, flatten, makeDistinct, pick, pluck } from '../../../shared/autocomplete/autocomplete.util';
import { dam } from '../../../shared/proto/dam-service';
import { AccessPolicyService } from '../../access-policies/access-policies.service';
import { ClaimDefinitionService } from '../../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../../passport-issuers/passport-issuerss.service';
import { EntityModel } from '../../shared/entity.model';
import { TrustedSourcesService } from '../../trusted-sources/trusted-sources.service';
import TestPersona = dam.v1.TestPersona;

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
})
export class PersonaFormComponent implements OnChanges, OnInit {

  @Input()
  persona?: TestPersona = TestPersona.create();

  passportIssuers$: Observable<any>;
  values$: { [s: string]: Observable<any>; } = {};
  claimDefinitions$: { [s: string]: Observable<any>; } = {};
  trustedSources$: { [s: string]: Observable<any>; } = {};

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

  constructor(private formBuilder: FormBuilder,
              private passportIssuerService: PassportIssuerService,
              private claimDefinitionService: ClaimDefinitionService,
              private trustedSourcesService: TrustedSourcesService,
              private accessPolicyService: AccessPolicyService) {

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

  ngOnInit(): void {
    const passportIssuers$ = this.passportIssuerService.getList(pick('dto.issuer')).pipe(
      map(makeDistinct)
    );

    this.passportIssuers$ = filterSource(passportIssuers$, this.personaForm.get('iss').valueChanges);
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
    const autocompleteId = new Date().getTime().toString();

    const formGroup: FormGroup = this.formBuilder.group({
      _autocompleteId: autocompleteId,
      claimName: [claimName, Validators.required],
      source: [source, Validators.required],
      value: [value, Validators.required],
      iat: [iat, Validators.required],
      exp: [exp, Validators.required],
      by: [by, Validators.required],
    });

    this.buildGa4GhClaimGroupAutocomplete(autocompleteId, formGroup);

    return formGroup;
  }

  private buildGa4GhClaimGroupAutocomplete(autocompleteId: string, formGroup: FormGroup) {
    const claimDefinitions$ = this.claimDefinitionService.getList(pick('name')).pipe(
      map(makeDistinct)
    );

    this.claimDefinitions$[autocompleteId] = filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);

    const trustedSources$ = this.trustedSourcesService.getList(pick('dto.sources')).pipe(
      map(flatten),
      map(makeDistinct)
    );

    this.trustedSources$[autocompleteId] = filterSource(trustedSources$, formGroup.get('source').valueChanges);

    const values$ = this.accessPolicyService.getList(pick('dto.allow')).pipe(
      map(pluck('anyTrue', [])),
      map(flatten),
      map(pluck('values', [])),
      map(flatten),
      map(makeDistinct)
    );

    this.values$[autocompleteId] = filterSource(values$, formGroup.get('value').valueChanges);
  }
}
