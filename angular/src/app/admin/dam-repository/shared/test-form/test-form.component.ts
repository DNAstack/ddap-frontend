import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import _set from 'lodash.set';
import { Observable, of, zip } from 'rxjs';
import { map, take, takeWhile, tap } from 'rxjs/operators';

import { pick } from '../../../../shared/autocomplete/autocomplete.util';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import Form from '../../../shared/form/form';
import { PersonasStore } from '../../personas/personas.store';
import { ResourceService } from '../../resources/resources.service';

@Component({
  selector: 'ddap-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
})
export class TestFormComponent implements OnChanges, Form {

  @Input()
  resource: EntityModel;
  @Input()
  isNewResource: boolean;
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  views: string[];
  personas: string[];
  form: FormGroup;

  private personas$: Observable<any>;
  private originalTest: any;

  constructor(private personasStore: PersonasStore,
              private resourceService: ResourceService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
    this.personas$ = this.personasStore
      .getAsList(this.routeDamId(), pick('name'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (_isEqual(changes.resource.currentValue, changes.resource.previousValue)) {
      return;
    }
    this.setViews();
    this.updatePersonaAccess();
  }

  setViews() {
    const resourceViews = _get(this.resource, 'dto.views', {});
    this.views = Object.keys(resourceViews).reduce((access, viewName) => {
      const view = _get(this.resource, `dto.views[${viewName}]`);
      const roles = _get(view, 'roles', {});
      const newAccess = Object.keys(roles).map((roleName) => `${viewName}/${roleName}`);
      return [...access, ...newAccess];
    }, []);
  }

  updatePersonaAccess() {
    this.personas$.subscribe(personas => {
      this.personas = personas;
      const { name, dto } = this.resource;
      if (dto) {
        const change = personas.reduce((sum, persona) => {
          _set(sum, `modification.testPersonas[${persona}].resources[${name}].access`, []);
          return sum;
        }, new ConfigModificationObject(dto, {
          dry_run: true,
        }));

        const action$ = this.isNewResource
          ? this.resourceService.save(this.routeDamId(), name, change)
          : this.resourceService.update(this.routeDamId(), name, change);
        action$.subscribe(
          () => true,
          (dryRunDto) => this.maybeFillInValues(personas, this.views, dryRunDto)
        );
      }
    });
  }

  maybeFillInValues(personas: string[], views: string[], {error}: any) {
    if (this.isConfigModificationObject(error)) {
      this.originalTest = error;
      this.buildTestForm(personas, views);
      personas.forEach((persona) => {
        const accesses = _get(error, `testPersonas[${persona}].resources[${this.resource.name}].access`, []);
        accesses.forEach((access) => {
          this.form.get(persona).get(access).setValue(true);
        });
      });
    }
  }

  buildTestForm(personas, views) {
    const reducer = (personasArray) => (sum, view) => {
      personasArray.forEach((persona) => {
        if (!sum[persona]) {
          sum[persona] = this.formBuilder.group({});
        }
        sum[persona].addControl(view, this.formBuilder.control(null));
      });
      return sum;
    };

    const form = views.reduce(reducer(personas), {});
    this.form = this.formBuilder.group(form);
    this.form.valueChanges.pipe(
      tap((valueChange) => this.change.emit(valueChange))
    );
  }

  toApplyDto() {
    if (!this.form) {
      return {};
    }

    const result = {...this.originalTest};
    const personaList = Object.keys(this.form.value);

    personaList.forEach((persona) => {
      const personaAccess = this.form.value[persona];
      const accesses = Object.keys(personaAccess);

      const toAdd = accesses.filter((access) => personaAccess[access] === true);
      _set(result, `testPersonas[${persona}]['resources'][${this.resource.name}]['access']`, toAdd);
      _set(result, `testPersonas[${persona}]['addResources']`, undefined);
      _set(result, `testPersonas[${persona}]['removeResources']`, undefined);
    });

    return result;
  }

  emitChange() {
    this.change.emit(this.form.value);
  }

  validatePersonaFields({error}) {
    const testPersonasCorrect = _get(error, 'testPersonas', {});

    const setError = ([persona, { access }]) => {
      access.forEach((accessRole) => {
        const accessRoleCheckbox = this.form.get(persona).get(accessRole);
        accessRoleCheckbox.setErrors({'Doesn\'t match role criteria': true});
      });
    };

    Object.entries(testPersonasCorrect)
      .forEach(([persona, {addResources, removeResources}]: any) => {
        const toAdd = _get(addResources, `${this.resource.name}`, {access: []});
        setError([persona, toAdd]);

        const toRemove = _get(removeResources, `${this.resource.name}`, {access: []});
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

  getAllForms(): FormGroup[] {
    return [this.form];
  }

  isValid(): boolean {
    return this.form.valid;
  }

  private isConfigModificationObject(error: any) {
    return error instanceof Object && error.testPersonas;
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
