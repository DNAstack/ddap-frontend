import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import _get from 'lodash.get';
import * as moment from 'moment';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Observable } from 'rxjs/Observable';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { dam } from '../../../shared/proto/dam-service';
import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { PersonaAutocompleteService } from '../persona-autocomplete.service';
import { PersonaResourceFormComponent } from '../persona-resource-form/persona-resource-form.component';
import { PersonaService } from '../personas.service';
import TestPersona = dam.v1.TestPersona;
import AccessList = dam.v1.AccessList;

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
})
export class PersonaFormComponent implements OnChanges, OnDestroy {

  @Input()
  persona?: TestPersona = TestPersona.create();

  @ViewChild(PersonaResourceFormComponent)
  accessForm: PersonaResourceFormComponent;

  form: FormGroup;

  get ga4ghClaims() {
    return this.form.get('ga4ghClaims') as FormArray;
  }

  get resources() {
    return this.form.get('resources') as FormGroup;
  }

  get standardClaims() {
    return this.form.get('standardClaims') as FormArray;
  }

  resourcesList = [];

  passportIssuers$: Observable<any>;
  policyValues$: { [s: string]: Observable<any>; } = {};
  claimDefinitions$: { [s: string]: Observable<any>; } = {};
  trustedSources$: { [s: string]: Observable<any>; } = {};

  private validatorSubscription: Subscription = new Subscription();
  private resourceAccess$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private resourceService: ResourceService,
              private personaAutocompleteService: PersonaAutocompleteService) {

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

  getModel(): EntityModel {
    const { id, iss, sub, ga4ghClaims, label } = this.form.value;
    const resources = this.accessForm.getModel();
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
    this.claimDefinitions$[autocompleteId] = this.personaAutocompleteService.buildClaimDefinitionAutocomplete(formGroup);
    this.trustedSources$[autocompleteId] = this.personaAutocompleteService.buildTrustedSourcesAutocomplete(formGroup);
    this.policyValues$[autocompleteId] = this.personaAutocompleteService.buildValuesAutocomplete(formGroup);
  }

  private buildForm(personaId: string, personaDto: TestPersona) {

    this.form = this.buildMainForm(personaId, personaDto);
    this.buildAccessForm(personaDto);

    this.passportIssuers$ = this.personaAutocompleteService.buildIssuerAutocomplete(this.form);

    if (personaId) {
      this.validatorSubscription.unsubscribe();
      this.validatorSubscription = this.setUpAccessValidator(personaId);
    }
  }

  private executeDryRunRequest(personaId: string, change: ConfigModificationObject) {
    return this.personaService.update(personaId, change).pipe(
      tap(() => this.accessForm.makeAccessFieldsValid()),
      catchError((error) => {
        this.accessForm.validateAccessFields(personaId, error);
        return EMPTY;
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

  private getGa4ghClaimModel({claimName, source, value, asserted, expires, by}): TestPersona.IGA4GHClaim {
    return {
      claimName,
      source,
      value,
      asserted: asserted.unix(),
      expires: expires.unix(),
      by,
    };
  }

  private getViewRolesCombinations(view: object) {
    const viewEntries = Object.entries(view);

    return viewEntries.reduce((sum, [viewName, viewDto]) => {
      const roles = Object.keys(viewDto.roles);
      return [...sum, ...roles.map((role) => `${viewName}/${role}`)];
    }, []);
  }

  private buildMainForm(personaId, personaDto) {
    const standardClaims = _get(personaDto, 'idToken.standardClaims', {});
    const ga4ghClaims: TestPersona.IGA4GHClaim[] = _get(personaDto, 'idToken.ga4ghClaims', []);

    return this.formBuilder.group({
      id: [{value: personaId, disabled: !!personaId}, [Validators.required, Validators.min(3)]],
      label: [personaDto.ui.label],
      iss: [standardClaims.iss, Validators.required],
      sub: [standardClaims.sub, Validators.required],
      ga4ghClaims: this.formBuilder.array(
        ga4ghClaims.map((claim) => this.buildGa4GhClaimGroup(claim))
      ),
      resources: this.formBuilder.group({}),
    });
  }

  private buildAccessForm(personaDto: TestPersona): void {
    this.resourceAccess$.subscribe(allResourceList => {
      this.registerAccessControls(allResourceList, personaDto);
      this.resourcesList = allResourceList;
    });
  }

  private registerAccessControls(allResourceList, personaDto) {
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

  private setUpAccessValidator(personaId) {
    return this.form.valueChanges.pipe(
      debounceTime(300),
      switchMap( () => {
        const personaModel: EntityModel = this.getModel();
        const change = new ConfigModificationObject(personaModel.dto, {
          dry_run: true,
        });

        return this.executeDryRunRequest(personaId, change);
      })
    ).subscribe();
  }
}
