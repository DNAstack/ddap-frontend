import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import _get from 'lodash.get';
import _isEqual from 'lodash.isequal';
import _set from 'lodash.set';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { Observable } from 'rxjs/Observable';
import { map, share, take, takeWhile, tap } from 'rxjs/operators';

import { pick } from '../../../shared/autocomplete/autocomplete.util';
import { PersonaService } from '../../personas/personas.service';
import { ResourceService } from '../../resources/resources.service';
import { ConfigModificationObject } from '../configModificationObject';
import { EntityModel } from '../entity.model';
import Form from '../form';

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

  constructor(private personaService: PersonaService,
              private resourceService: ResourceService,
              private formBuilder: FormBuilder) {
    this.personas$ = this.personaService
      .getList(pick('name'))
      .pipe(
        share()
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (_isEqual(changes.resource.currentValue, changes.resource.previousValue)) {
      return;
    }

    const resourceViews = _get(this.resource, 'dto.views', {});
    const viewNames = Object.keys(resourceViews);

    this.views = viewNames.reduce((access, viewName) => {
      const view = _get(this.resource, `dto.views[${viewName}]`);
      const roles = _get(view, 'roles', {});
      const roleNames = Object.keys(roles);

      const newAccess = roleNames.map((roleName) => `${viewName}/${roleName}`);

      return [...access, ...newAccess];
    }, []);

    const reducer = (personas) => (sum, view) => {
      personas.forEach((persona) => {
        if (!sum[persona]) {
          sum[persona] = this.formBuilder.group({});
        }

        sum[persona].addControl(view, this.formBuilder.control(null));
      });
      return sum;
    };

    zip(this.personas$, of(this.views)).pipe(
      takeWhile(([personas, views]) => !!views.length),
      map(([personas, views]) => {
        return [views, personas, views.reduce(reducer(personas), {})];
      }),
      take(1)
    ).subscribe(([views, personas, form]) => {
      this.form = this.formBuilder.group(form);

      this.form.valueChanges.pipe(
        tap((valueChange) => this.change.emit(valueChange))
      );

      this.views = views;
      this.personas = personas;

      if (this.resource.dto) {
        const change = personas.reduce((sum, persona) => {
          _set(sum, `modification.testPersonas[${persona}].resources[${this.resource.name}].access`, []);
          return sum;
        }, new ConfigModificationObject(this.resource.dto, {
          dry_run: true,
        }));

        const action$ = this.isNewResource
          ? this.resourceService.save(this.resource.name, change)
          : this.resourceService.update(this.resource.name, change);
        action$.subscribe(
          () => true,
          (dryRunDto) => this.maybeFillInValues(this.form, personas, views, dryRunDto)
        );
      }
    });
  }

  maybeFillInValues(form: FormGroup, personas: string[], views: string[], {error}: any) {
    if (this.isConfigModificationObject(error)) {
      this.originalTest = error;
      personas.forEach((persona) => {
        const accesses = _get(error, `testPersonas[${persona}].resources[${this.resource.name}].access`, []);
        accesses.forEach((access) => {
          form.get(persona).get(access).setValue(true);
        });
      });
    }
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
}
