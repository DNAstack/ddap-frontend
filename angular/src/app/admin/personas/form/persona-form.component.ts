import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import TestPersona = dam.v1.TestPersona;
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { filterSource, flatten, makeDistinct, pick, pluck } from '../../../shared/autocomplete/autocomplete.util';
import { dam } from '../../../shared/proto/dam-service';
import { AccessPolicyService } from '../../access-policies/access-policies.service';
import { ClaimDefinitionService } from '../../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../../passport-issuers/passport-issuerss.service';
import { ResourceService } from '../../resources/resources.service';
import { EntityModel } from '../../shared/entity.model';
import { TrustedSourcesService } from '../../trusted-sources/trusted-sources.service';

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
})
export class PersonaFormComponent implements OnChanges {

  @Input()
  persona?: TestPersona = TestPersona.create();

  resourcesList = [];
  passportIssuers$: Observable<any>;
  policyValues$: { [s: string]: Observable<any>; } = {};
  claimDefinitions$: { [s: string]: Observable<any>; } = {};
  trustedSources$: { [s: string]: Observable<any>; } = {};

  form: FormGroup;

  resourceList$: Observable<any>;

  get resources() {
    return this.form.get('resources') as FormGroup;
  }

  get standardClaims() {
    return this.form.get('standardClaims') as FormArray;
  }

  get ga4ghClaims() {
    return this.form.get('ga4ghClaims') as FormArray;
  }

  constructor(private formBuilder: FormBuilder,
              private passportIssuerService: PassportIssuerService,
              private claimDefinitionService: ClaimDefinitionService,
              private trustedSourcesService: TrustedSourcesService,
              private accessPolicyService: AccessPolicyService,
              private resourceService: ResourceService) {
    this.resourceList$ = this.resourceService.getList().pipe(
      map((resourceList) => {
        return resourceList.map((resource) => {
          const name = resource.name;
          const views = this.getViewRolesCombinations(resource.dto.views);

          return {
            name,
            views,
          };
        });
      })
    );
  }

  ngOnChanges({persona}: SimpleChanges): void {
    const personaId: string = _get(persona, 'currentValue.name', '');
    const personaDto: TestPersona = _get(persona, 'currentValue.dto', TestPersona.create({}));

    this.buildForm(personaId, personaDto);

    const passportIssuers$ = this.passportIssuerService.getList(pick('dto.issuer')).pipe(
      map(makeDistinct)
    );
    this.passportIssuers$ = filterSource(passportIssuers$, this.form.get('iss').valueChanges);

  }

  removeClaim(index) {
    this.ga4ghClaims.removeAt(index);
  }

  addGa4ghClaims() {
    this.ga4ghClaims.insert(0, this.buildGa4GhClaimGroup({}));
  }

  getResourcesModel() {
    const isViewAllowed = ([accessName, isAllowed]) => isAllowed;
    const getAccessName = ([accessName, isAllowed]) => accessName;

    return Object.entries(this.form.value.resources)
      .reduce((sum, [resource, views]) => {
        const access = Object.entries(views)
          .filter(isViewAllowed)
          .map(getAccessName);

        if (access.length) {
          sum[resource] = {access};
        }

        return sum;
      }, {});
  }

  getEntityModel(): EntityModel {
    const { id, iss, sub, ga4ghClaims, label } = this.form.value;
    const resources = this.getResourcesModel();
    const testPersona: TestPersona = TestPersona.create({
      idToken: {
        standardClaims: {
          iss,
          sub,
        },
        ga4ghClaims: ga4ghClaims.map(this.getGa4ghClaimModel),
      },
      ui: {
        label,
      },
      resources,
    });

    return new EntityModel(id, testPersona);
  }

  getGa4ghClaimModel({claimName, source, value, asserted, expires, by}): TestPersona.IGA4GHClaim {
    return {
      claimName,
      source,
      value,
      asserted: asserted.unix(),
      expires: expires.unix(),
      by,
    };
  }

  private buildGa4GhClaimGroup({claimName, source, value, asserted, expires, by}: TestPersona.IGA4GHClaim): FormGroup {
    const autocompleteId = new Date().getTime().toString();
    const ga4ghClaimForm: FormGroup = this.formBuilder.group({
      _autocompleteId: autocompleteId,
      claimName: [claimName, Validators.required],
      source: [source, Validators.required],
      value: [value, Validators.required],
      asserted: [moment.unix(asserted), Validators.required],
      expires: [moment.unix(expires), Validators.required],
      by: [by, Validators.required],
    });

    this.buildGa4GhClaimGroupAutocomplete(autocompleteId, ga4ghClaimForm);

    return ga4ghClaimForm;
  }

  private buildGa4GhClaimGroupAutocomplete(autocompleteId: string, formGroup: FormGroup) {
    this.claimDefinitions$[autocompleteId] = this.buildClaimDefinitionAutocomplete(formGroup);
    this.trustedSources$[autocompleteId] = this.buildTrustedSourcesAutocomplete(formGroup);
    this.policyValues$[autocompleteId] = this.buildPolicyValuesAutocomplete(formGroup);
  }

  private buildClaimDefinitionAutocomplete(formGroup: FormGroup) {
    const claimDefinitions$ = this.claimDefinitionService.getList(pick('name')).pipe(
      map(makeDistinct)
    );

    return filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);
  }

  private buildTrustedSourcesAutocomplete(formGroup: FormGroup) {
    const trustedSources$ = this.trustedSourcesService.getList(pick('dto.sources')).pipe(
      map(flatten),
      map(makeDistinct)
    );

     return filterSource(trustedSources$, formGroup.get('source').valueChanges);
  }

  private buildPolicyValuesAutocomplete(formGroup: FormGroup) {
    const claimValues$ = this.accessPolicyService.getList(pick('dto.allow')).pipe(
      map(pluck('anyTrue', [])),
      map(flatten),
      map(pluck('values', [])),
      map(flatten),
      map(makeDistinct)
    );

    return filterSource(claimValues$, formGroup.get('value').valueChanges);
  }

  private buildForm(personaId: string, personaDto: TestPersona) {
    const standardClaims = _get(personaDto, 'idToken.standardClaims', {});
    const ga4ghClaims: TestPersona.IGA4GHClaim[] = _get(personaDto, 'idToken.ga4ghClaims', []);

    this.form = this.formBuilder.group({
      id: [{value: personaId, disabled: !!personaId}, [Validators.required, Validators.min(3)]],
      label: [personaDto.ui.label],
      iss: [standardClaims.iss, Validators.required],
      sub: [standardClaims.sub, Validators.required],
      ga4ghClaims: this.formBuilder.array(
        ga4ghClaims.map((claim) => this.buildGa4GhClaimGroup(claim))
      ),
      resources: this.formBuilder.group({}),
    });

    this.buildResourcesForm(personaDto);
  }

  private getViewRolesCombinations(views: object) {
    const viewEntries = Object.entries(views);

    return viewEntries.reduce((sum, [viewName, viewDto]) => {
      const roles = Object.keys(viewDto.roles);
      return [...sum, ...roles.map((role) => `${viewName}/${role}`)];
    }, []);
  }

  private buildResourcesForm(personaDto: TestPersona) {
    this.resourceList$.subscribe(allResourceList => {
      this.toFormGroup(allResourceList, personaDto);
      this.resourcesList = allResourceList;
    });
  }

  private toFormGroup(resourceList, personaDto) {
    const personaResources = personaDto.resources;

    resourceList.forEach(({name, views}) => {

      if (views) {
        const viewsGroup = views.reduce((sum, view) => {
          const access = _get(personaResources, `[${name}].access`, []);
          const isChecked = access.indexOf(view) > -1;
          sum[view] = [isChecked];

          return sum;
        }, {});

        this.resources.registerControl(name, this.formBuilder.group(viewsGroup));
      }
    });
  }
}
