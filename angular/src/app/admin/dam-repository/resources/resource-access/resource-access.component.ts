import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import _set from 'lodash.set';
import { Observable, of, Subject, zip } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take, takeWhile, tap } from 'rxjs/operators';

import { pick } from '../../../../shared/autocomplete/autocomplete.util';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import Form from '../../../shared/form/form';
import { PersonasStore } from '../../personas/personas.store';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-access',
  templateUrl: './resource-access.component.html',
  styleUrls: ['./resource-access.component.scss'],
})
export class ResourceAccessComponent implements Form, OnChanges {

  @Input()
  resource: EntityModel;
  @Input()
  isNewResource: boolean;
  @Input()
  damId: string;
  @Output()
  formChange: EventEmitter<any> = new EventEmitter<any>();

  error: any = null;
  save$: Subject<any> = new Subject();
  views: string[];
  personas: EntityModel[];
  form: FormGroup;

  private personas$: Observable<any>;
  private originalTest: any;

  constructor(private resourceService: ResourceService,
              private personasStore: PersonasStore,
              private formBuilder: FormBuilder) {
    this.save$.pipe(
      debounceTime(800),
      switchMap(({changes, isDryRun}) => this.saveResource(changes, isDryRun))
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (_isEqual(changes.resource.currentValue, changes.resource.previousValue)) {
      return;
    }
    this.personas$ = this.personasStore.getAsList(this.damId);

    this.setResourceViews();
    this.buildForm();
  }

  setResourceViews() {
    const resourceViews = _get(this.resource, 'dto.views', {});
    this.views = Object.keys(resourceViews).reduce((access, viewName) => {
      const view = _get(this.resource, `dto.views[${viewName}]`);
      const roles = _get(view, 'roles', {});
      const newAccess = Object.keys(roles).map((roleName) => `${viewName}/${roleName}`);
      return [...access, ...newAccess];
    }, []);
  }

  buildForm() {
    this.personas$.subscribe(personas => {
      const reducer = (personasArray) => (sum, view) => {
        personasArray.forEach((persona) => {
          if (!sum[persona]) {
            sum[persona] = this.formBuilder.group({});
          }
          sum[persona].addControl(view, this.formBuilder.control(null));
        });
        return sum;
      };
      this.personas = personas;
      const personaNames = [];
      const resourceViewAccess = {};
      this.personas.map(persona => {
        const { name, dto } = persona;
        if (dto.access) {
          resourceViewAccess[name] = dto;
        }
        personaNames.push(name);
      });
      const form = this.views.reduce(reducer(personaNames), {});
      this.form = this.formBuilder.group(form);

      this.form.valueChanges.pipe(
        tap((valueChange) => this.formChange.emit(valueChange))
      );
      this.updateAccess(resourceViewAccess);
    });
  }

  updateAccess(resourceViewAccess) {
    for (const[persona, viewAccess] of Object.entries(resourceViewAccess)) {
      const accesses = _get(viewAccess, `access`, []);
      accesses.forEach((access) => {
        if (this.isViewOfThisResource(access)) {
          const accessViewRole = this.getAccessViewName(access);
          if (this.form.get(persona) && this.form.get(persona).get(accessViewRole)) {
            this.form.get(persona).get(accessViewRole).setValue(true);
          }
        }
      });
    }
  }
  validatePersonaFields({error}) {
    const testPersonasCorrect = _get(error, 'testPersonas', {});
    const setError = ([persona, access]) => {
      access.forEach((accessRole) => {
        const resourceName = accessRole.substr(0, accessRole.indexOf('/'));
        const accessViewRole = accessRole.replace(`${resourceName}/`, '');
        const accessRoleCheckbox = this.form.get(persona).get(accessViewRole);
        accessRoleCheckbox.setErrors({'Doesn\'t match role criteria': true});
      });
    };

    Object.entries(testPersonasCorrect)
      .forEach(([persona, {addAccess, removeAccess}]: any) => {
        const toAdd = addAccess.filter(access => this.isViewOfThisResource(access));
        setError([persona, toAdd]);

        const toRemove = removeAccess.filter(access => this.isViewOfThisResource(access));
        setError([persona, toRemove]);
      });
  }

  makeFieldsValid() {
    const clearError = (access: string, resource: FormGroup) => {
      const accessControl = resource.get(access) as FormControl;
      accessControl.setErrors(null);
    };

    Object.keys(this.form.controls)
      .forEach((access) => {
        const accessFormGroup = this.form.get(access) as FormGroup;
        Object.keys(accessFormGroup.controls)
          .forEach((persona) => clearError(persona, accessFormGroup));
      });
  }

  toApplyDto() {
    if (!this.form) {
      return {};
    }

    const originalTest = {...this.originalTest};

    Object.keys(this.form.value).forEach((persona) => {
      const personaAccess = this.form.value[persona];
      const accesses = Object.keys(personaAccess);
      const accessForNonRelevantViews = this.getNonRelevantViews(persona);
      const toAdd = accesses
        .filter((access) => personaAccess[access] === true)
        .map((access) => `${this.resource.name}/${access}`);

      _set(originalTest, `testPersonas[${persona}]['access']`, [...toAdd, ...accessForNonRelevantViews]);
      _set(originalTest, `testPersonas[${persona}]['addAccess']`, undefined);
      _set(originalTest, `testPersonas[${persona}]['removeAccess']`, undefined);
    });

    return originalTest;
  }

  getNonRelevantViews(persona) {
    let nonRelevantViews = [];
    this.personas.map(personaEntity => {
      if (personaEntity.name === persona) {
        nonRelevantViews = _get(personaEntity.dto, `access`, [])
          .filter(access => !this.isViewOfThisResource(access));
      }
    });
    return nonRelevantViews;
  }

  getApplyModel(isDryRun?: boolean) {
    const dtoResult = this.toApplyDto();
    this.originalTest = dtoResult;
    return isDryRun ? {dry_run: true, ...dtoResult} : dtoResult;
  }

  emitChange() {
    this.formChange.emit();
  }

  save(changes: EntityModel) {
    this.save$.next({ changes, isDryRun: false });
  }

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

  isConfigModificationObject({error}: any) {
    return error instanceof Object && error.testPersonas;
  }

  private saveResource(changes: object, isDryRun = true) {
    const applyModel = this.toApplyDto();

    if (isDryRun) {
      applyModel['dry_run'] = true;
    }

    const change = new ConfigModificationObject(_get(changes, 'dto', this.resource.dto), applyModel);

    const action$ = this.isNewResource
      ? this.resourceService.save(this.damId, this.resource.name, change)
      : this.resourceService.update(this.damId, this.resource.name, change);
    return action$.pipe(
      catchError((e) => {
        this.error = e.error;
        this.validatePersonaFields(e);

        return of(true);
      }),
      tap((wasError) => {
        if (wasError) {
          return;
        }
        this.error = null;

        if (isDryRun) {
          return this.makeFieldsValid();
        }
      })
    );
  }

  private isViewOfThisResource(access: string): boolean {
    return ((access.split('/').indexOf(this.resource.name)) === 0);
  }

  private getAccessViewName(access: string) {
    return access.split('/').slice(1).join('/');
  }
}
