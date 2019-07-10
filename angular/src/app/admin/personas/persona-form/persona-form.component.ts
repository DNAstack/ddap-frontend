import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Observable } from 'rxjs/Observable';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { dam } from '../../../shared/proto/dam-service';
import { FormValidators } from '../../../shared/validators';
import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel, nameConstraintPattern } from '../../shared/entity.model';
import Form from '../../shared/form';
import { PersonaAutocompleteService } from '../persona-autocomplete.service';
import { PersonaAccessFormComponent } from '../persona-resource-form/persona-access-form.component';
import { PersonaService } from '../personas.service';
import TestPersona = dam.v1.TestPersona;
import AccessList = dam.v1.AccessList;

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
})
export class PersonaFormComponent implements OnChanges, OnDestroy, Form {

  @Input()
  persona?: TestPersona = TestPersona.create();

  @ViewChild(PersonaAccessFormComponent, { static: false })
  accessForm: PersonaAccessFormComponent;

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

  resourceAccessSubscription: Subscription = new Subscription();
  private validatorSubscription: Subscription = new Subscription();
  private resourceAccess$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private resourceService: ResourceService,
              private personaAutocompleteService: PersonaAutocompleteService,
              private route: ActivatedRoute) {

    this.resourceAccess$ = this.resourceService.getList(this.routeDamId()).pipe(
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
    this.resourceAccessSubscription.unsubscribe();
  }

  addGa4ghClaims() {
    this.ga4ghClaims.insert(0, this.buildGa4GhClaimGroup({}));
  }

  removeGa4ghClaim(index) {
    this.ga4ghClaims.removeAt(index);
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
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

  private buildGa4GhClaimGroup({claimName, source, value, assertedDuration, expiresDuration, by}: TestPersona.IGA4GHClaim): FormGroup {
    const autocompleteId = new Date().getTime().toString();

    const ga4ghClaimForm: FormGroup = this.formBuilder.group({
      _autocompleteId: autocompleteId,
      claimName: [claimName, Validators.required],
      source: [source, Validators.required],
      value: [value, Validators.required],
      assertedDuration: [assertedDuration, [Validators.required, FormValidators.duration]],
      expiresDuration: [expiresDuration, [Validators.required, FormValidators.duration]],
      by: [by],
    });

    this.buildGa4GhClaimGroupAutocomplete(autocompleteId, ga4ghClaimForm);

    return ga4ghClaimForm;
  }

  private buildGa4GhClaimGroupAutocomplete(autocompleteId: string, formGroup: FormGroup) {
    this.claimDefinitions$[autocompleteId] = this.personaAutocompleteService.buildClaimDefinitionAutocomplete(this.routeDamId(), formGroup);
    this.trustedSources$[autocompleteId] = this.personaAutocompleteService.buildTrustedSourcesAutocomplete(formGroup);
    this.policyValues$[autocompleteId] = this.personaAutocompleteService.buildValuesAutocomplete(this.routeDamId(), formGroup);
  }

  private buildForm(personaId: string, personaDto: TestPersona) {

    this.form = this.buildMainForm(personaId, personaDto);
    this.resourceAccessSubscription.unsubscribe();
    this.resourceAccessSubscription = this.buildAccessForm(personaDto);

    if (!this.resourceAccessSubscription.closed) {
      this.form.disable();
    }

    this.passportIssuers$ = this.personaAutocompleteService.buildIssuerAutocomplete(this.routeDamId(), this.form);

    if (personaId) {
      this.validatorSubscription.unsubscribe();
      this.validatorSubscription = this.setUpAccessValidator(personaId);
    }
  }

  private executeDryRunRequest(personaId: string, change: ConfigModificationObject) {
    return this.personaService.update(this.routeDamId(), personaId, change).pipe(
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

  private getGa4ghClaimModel({claimName, source, value, assertedDuration, expiresDuration, by}): TestPersona.IGA4GHClaim {
    return {
      claimName,
      source,
      value,
      assertedDuration,
      expiresDuration,
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
      id: [{value: personaId, disabled: !!personaId}, [
        Validators.pattern(nameConstraintPattern),
      ]],
      label: [personaDto.ui.label],
      iss: [standardClaims.iss, Validators.required],
      sub: [standardClaims.sub, Validators.required],
      ga4ghClaims: this.formBuilder.array(
        ga4ghClaims.map((claim) => this.buildGa4GhClaimGroup(claim))
      ),
      resources: this.formBuilder.group({}),
    });
  }

  private buildAccessForm(personaDto: TestPersona): Subscription {
    return this.resourceAccess$.subscribe(allResourceList => {
      this.registerAccessControls(allResourceList, personaDto);
      this.resourcesList = allResourceList;
      this.form.enable();
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

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }
}
