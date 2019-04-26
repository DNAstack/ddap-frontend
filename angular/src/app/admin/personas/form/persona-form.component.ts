import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import * as moment from 'moment';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import TestPersona = dam.v1.TestPersona;
import AccessList = dam.v1.AccessList;
import { Subscription } from 'rxjs/Subscription';

import { filterSource, flatten, makeDistinct, pick, pluck } from '../../../shared/autocomplete/autocomplete.util';
import { dam } from '../../../shared/proto/dam-service';
import { AccessPolicyService } from '../../access-policies/access-policies.service';
import { ClaimDefinitionService } from '../../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../../passport-issuers/passport-issuerss.service';
import { ResourceService } from '../../resources/resources.service';
import { AutocompleteService } from '../../shared/autocomplete.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { TrustedSourcesService } from '../../trusted-sources/trusted-sources.service';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
})
export class PersonaFormComponent implements OnChanges, OnDestroy {

  get resources() {
    return this.form.get('resources') as FormGroup;
  }

  get standardClaims() {
    return this.form.get('standardClaims') as FormArray;
  }

  get ga4ghClaims() {
    return this.form.get('ga4ghClaims') as FormArray;
  }

  @Input()
  persona?: TestPersona = TestPersona.create();

  resourcesList = [];
  passportIssuers$: Observable<any>;
  policyValues$: { [s: string]: Observable<any>; } = {};
  claimDefinitions$: { [s: string]: Observable<any>; } = {};
  trustedSources$: { [s: string]: Observable<any>; } = {};

  form: FormGroup;

  private validatorSubscription: Subscription = new Subscription();
  private resourceAccess$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private passportIssuerService: PassportIssuerService,
              private claimDefinitionService: ClaimDefinitionService,
              private trustedSourcesService: TrustedSourcesService,
              private accessPolicyService: AccessPolicyService,
              private personaService: PersonaService,
              private resourceService: ResourceService,
              private autocompleteService: AutocompleteService) {

    this.resourceAccess$ = this.resourceService.getList().pipe(
      map((resourceList) => this.generateAllAccessModel(resourceList))
    );
  }

  ngOnChanges({persona}: SimpleChanges): void {
    const personaId: string = _get(persona, 'currentValue.name', '');
    const personaDto: TestPersona = _get(persona, 'currentValue.dto', TestPersona.create({}));

    this.buildForm(personaId, personaDto);
  }

  ngOnDestroy(): void {
    this.validatorSubscription.unsubscribe();
  }

  addGa4ghClaims() {
    this.ga4ghClaims.insert(0, this.buildGa4GhClaimGroup({}));
  }

  removeGa4ghClaim(index) {
    this.ga4ghClaims.removeAt(index);
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

  invalidateAccessFields({error}) {
    const personaId = this.form.get('id').value;
    const resourcesFormGroup = this.form.get('resources');
    const fieldsToAdd: object = _get(error, `testPersonas[${personaId}].addResources`, []);
    const fieldsToRemove: object = _get(error, `testPersonas[${personaId}].removeResources`, []);

    const setError = ([resourceName, { access }]) => {
      access.forEach((accessRole) => {
        const accessRoleCheckbox = resourcesFormGroup.get(resourceName).get(accessRole);
        accessRoleCheckbox.setErrors({'Doesn\'t match role criteria': true});
      });
    };

    Object.entries(fieldsToAdd)
      .forEach(setError);

    Object.entries(fieldsToRemove)
      .forEach(setError);
  }

  public getAutocompleteOptionsForValues(index): Observable<string[]> {
    const formGroup = this.ga4ghClaims.at(index);
    const { claimName } = formGroup.value;

    if (!claimName || claimName.length === 0) {
      return;
    }

    if (!this.policyValues$[claimName]) {
      const claimValues$ = this.autocompleteService.getClaimDefinitionSuggestions(claimName);
      this.policyValues$[claimName] = filterSource(claimValues$, formGroup.get('value').valueChanges);
    }

    return this.policyValues$[claimName];
  }

  private getResourcesModel() {
    const isViewAllowed = ([_, isAllowed]) => isAllowed;
    const getAccessName = ([accessName, _]) => accessName;

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
  }

  private buildClaimDefinitionAutocomplete(formGroup: FormGroup) {
    const claimDefinitions$ = this.claimDefinitionService.getList(pick('name')).pipe(
      map(makeDistinct)
    );

    return filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);
  }

  private buildIssuerAutocomplete() {
    const passportIssuers$ = this.passportIssuerService.getList(pick('dto.issuer')).pipe(
      map(makeDistinct)
    );
    return filterSource(passportIssuers$, this.form.get('iss').valueChanges);
  }

  private buildTrustedSourcesAutocomplete(formGroup: FormGroup) {
    const trustedSources$ = this.trustedSourcesService.getList(pick('dto.sources')).pipe(
      map(flatten),
      map(makeDistinct)
    );

     return filterSource(trustedSources$, formGroup.get('source').valueChanges);
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

    this.buildAccessForm(personaDto);

    this.passportIssuers$ = this.buildIssuerAutocomplete();

    if (personaId) {
      this.setUpAccessValidator(personaId);
    }
  }

  private executeDryRunRequest(personaId: string, change: ConfigModificationObject) {
    return this.personaService.update(personaId, change).pipe(
      tap(() => this.makeAccessFieldsValid()),
      catchError((error) => {
      this.invalidateAccessFields(error);
      return of();
    }));
  }

  private generateAllAccessModel(resourceList): AccessList {
    return resourceList.map((resource) => this.generateAccessModel(resource));
  }

  private generateAccessModel(resource) {
    const name = resource.name;
    const access = this.getViewRolesCombinations(resource.dto.views);

    return {
      name,
      access,
    };
  }

  private getViewRolesCombinations(view: object) {
    const viewEntries = Object.entries(view);

    return viewEntries.reduce((sum, [viewName, viewDto]) => {
      const roles = Object.keys(viewDto.roles);
      return [...sum, ...roles.map((role) => `${viewName}/${role}`)];
    }, []);
  }

  private buildAccessForm(personaDto: TestPersona) {
    this.resourceAccess$.subscribe(allResourceList => {
      this.toFormGroup(allResourceList, personaDto);
      this.resourcesList = allResourceList;
    });
  }

  private toFormGroup(allResourceList, personaDto) {
    const personaResources = personaDto.resources;

    allResourceList.forEach(({name, access}) => {
      if (!access) {
        return;
      }

      const resourceAccessFormGroup = access.reduce((result, view) => {
        const currentResourceAccess = _get(personaResources, `[${name}].access`, []);
        const isInCurrentResource = currentResourceAccess.indexOf(view) > -1;

        result[view] = [isInCurrentResource];

        return result;
      }, {});

      this.resources.registerControl(name, this.formBuilder.group(resourceAccessFormGroup));
    });
  }

  private makeAccessFieldsValid() {
    const resourcesFormGroup = this.form.get('resources') as FormGroup;

    const clearError = (access: string, resource: FormGroup) => {
      const accessControl = resource.get(access) as FormControl;
      accessControl.setErrors(null);
    };

    Object.keys(resourcesFormGroup.controls)
      .forEach((resourceName) => {
        const resource = resourcesFormGroup.get(resourceName) as FormGroup;

        Object.keys(resource.controls)
          .forEach((accessName) => clearError(accessName, resource));
      });
  }

  private setUpAccessValidator(personaId) {
    this.validatorSubscription.unsubscribe();

    this.validatorSubscription = this.form.valueChanges.pipe(
      debounceTime(300),
      switchMap( () => {
        const personaModel: EntityModel = this.getEntityModel();
        const change = new ConfigModificationObject(personaModel.dto, {
          dry_run: true,
        });

        return this.executeDryRunRequest(personaId, change);
      })
    ).subscribe();
  }
}
