import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { combineLatest, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';

import { filterBy, flatten, includes, makeDistinct, pick } from '../../../../shared/autocomplete/autocomplete.util';
import { FormValidators } from '../../../../shared/form/validators';
import { dam } from '../../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel, nameConstraintPattern } from '../../../shared/entity.model';
import Form from '../../../shared/form/form';
import { ClaimDefinitionService } from '../../claim-definitions/claim-definitions.service';
import { ClaimDefinitionsStore } from '../../claim-definitions/claim-definitions.store';
import { PassportIssuersStore } from '../../passport-issuers/passport-issuers.store';
import TestPersona = dam.v1.TestPersona;
import AccessList = dam.v1.AccessList;
import { ResourcesStore } from '../../resources/resources.store';
import { TrustedSourcesStore } from '../../trusted-sources/trusted-sources.store';
import { PersonaAccessFormComponent } from '../persona-resource-form/persona-access-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
})
export class PersonaFormComponent implements OnInit, OnDestroy, Form {

  @Input()
  persona?: EntityModel = new EntityModel('', TestPersona.create());

  @ViewChild(PersonaAccessFormComponent, { static: false })
  accessForm: PersonaAccessFormComponent;

  form: FormGroup;
  resourcesList = [];

  passportIssuers: Observable<string[]>;
  claimDefinitions: Observable<string[]>;
  trustedSources: Observable<string[]>;
  claimSuggestedValues: string[];

  private validatorSubscription: Subscription = new Subscription();
  private resourceAccess$: Observable<any>;

  get standardClaims() {
    return this.form.get('idToken.standardClaims') as FormArray;
  }

  get ga4ghClaims() {
    return this.form.get('idToken.ga4ghClaims') as FormArray;
  }

  get resourceAccess() {
    return this.form.get('resourceAccess') as FormGroup;
  }

  constructor(private formBuilder: FormBuilder,
              private personaService: PersonaService,
              private resourcesStore: ResourcesStore,
              private claimDefService: ClaimDefinitionService,
              private claimDefinitionsStore: ClaimDefinitionsStore,
              private passportIssuersStore: PassportIssuersStore,
              private trustedSourcesStore: TrustedSourcesStore,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.resourceAccess$ = this.resourcesStore.getAsList(this.routeDamId()).pipe(
      map((resourceList) => this.generateAllAccessModel(resourceList))
    );

    const { ui, idToken } = _get(this.persona, 'dto', {});
    this.form = this.formBuilder.group({
      id: [this.persona.name || '', [Validators.pattern(nameConstraintPattern)]],
      ui: this.formBuilder.group({
        label: [ui.label || '', [Validators.required]],
      }),
      idToken: this.formBuilder.group({
        standardClaims: this.formBuilder.group({
          iss: [_get(idToken, 'standardClaims.iss', ''), Validators.required],
          sub: [_get(idToken, 'standardClaims.sub', ''), Validators.required],
        }),
        ga4ghClaims: this.formBuilder.array(
          idToken && idToken.ga4ghClaims
          ? idToken.ga4ghClaims.map((claim) => this.buildGa4GhClaimGroup(claim))
          : []
        ),
      }),
      resourceAccess: this.formBuilder.group({}),
    });

    if (this.persona && this.persona.dto) {
      this.buildAccessForm(this.persona.dto);
    }

    if (!this.resourcesList) {
      this.form.disable();
    }
    if (this.persona && this.persona.name) {
      this.validatorSubscription.unsubscribe();
      this.validatorSubscription = this.setUpAccessValidator(this.persona.name);
    }

    this.getAutocompleteValues();
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

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getModel(): EntityModel {
    const { id, idToken, ui } = this.form.value;
    const resources = this.accessForm.getModel();
    const testPersona: TestPersona = TestPersona.create({
      ui,
      idToken,
      resources,
    });

    return new EntityModel(id, testPersona);
  }

  private buildGa4GhClaimGroup({claimName, source, value, assertedDuration, expiresDuration, by}: TestPersona.IGA4GHClaim): FormGroup {
    const ga4ghClaimForm: FormGroup = this.formBuilder.group({
      claimName: [claimName, [Validators.required]],
      source: [source, [Validators.required, FormValidators.url]],
      value: [value, [Validators.required]],
      assertedDuration: [assertedDuration, [Validators.required, FormValidators.duration]],
      expiresDuration: [expiresDuration, [Validators.required, FormValidators.duration]],
      by: [by],
    });

    this.buildSuggestedAutocompleteValuesForClaim(ga4ghClaimForm)
      .subscribe((policies) => {
        this.claimSuggestedValues = policies;
      });

    return ga4ghClaimForm;
  }

  private getAutocompleteValues() {
    this.claimDefinitions = this.claimDefinitionsStore.getAsList(this.routeDamId(), pick('name'))
      .pipe(
        map(makeDistinct)
      );
    this.trustedSources = this.trustedSourcesStore.getAsList(this.routeDamId(), pick('dto.sources'))
      .pipe(
        map(flatten),
        map(makeDistinct)
      );
    this.passportIssuers = this.passportIssuersStore.getAsList(this.routeDamId(), pick('dto.issuer'))
      .pipe(
        map(makeDistinct)
      );
  }

  private buildSuggestedAutocompleteValuesForClaim(formGroup: FormGroup): Observable<any> {
    const claimName$ = formGroup.get('claimName').valueChanges.pipe(
      startWith('')
    );
    const value$ = formGroup.get('value').valueChanges.pipe(
      startWith('')
    );

    return combineLatest(claimName$, value$).pipe(
      debounceTime(300),
      switchMap(([claimName, value]) => {
        const currentClaimName = formGroup.get('claimName').value;
        return this.claimDefService.getClaimDefinitionSuggestions(this.routeDamId(), claimName || currentClaimName).pipe(
          map(filterBy(includes(value)))
        );
      })
    );
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

  private getViewRolesCombinations(view: object) {
    const viewEntries = Object.entries(view);

    return viewEntries.reduce((sum, [viewName, viewDto]) => {
      const roles = Object.keys(viewDto.roles);
      return [...sum, ...roles.map((role) => `${viewName}/${role}`)];
    }, []);
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

      this.resourceAccess.setControl(name, this.formBuilder.group(resourceAccessFormGroup));
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
