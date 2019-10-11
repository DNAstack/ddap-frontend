import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  @Input()
  damId: string;
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  views: string[];
  personas: string[];
  form: FormGroup;

  private personas$: Observable<any>;
  private originalTest: any;

  constructor(private personasStore: PersonasStore,
              private resourceService: ResourceService,
              private formBuilder: FormBuilder) {
    this.personas$ = this.personasStore
      .getAsList(this.damId, pick('name'));
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
          _set(sum, `modification.testPersonas[${persona}].access`, []);
          return sum;
        }, new ConfigModificationObject(this.resource.dto, {
          dry_run: true,
        }));

        const action$ = this.isNewResource
          ? this.resourceService.save(this.damId, this.resource.name, change)
          : this.resourceService.update(this.damId, this.resource.name, change);
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
        const accesses: string[] = _get(error, `testPersonas[${persona}].access`, []);
        accesses.forEach((access) => {
          if (access.includes(this.resource.name)) {
            const accessViewRole = access.replace(`${this.resource.name}/`, '');
            form.get(persona).get(accessViewRole).setValue(true);
          }
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

      const accessForNonRelevantViews: string[] = _get(result, `testPersonas[${persona}].access`, [])
        .filter((access) => !access.includes(this.resource.name));

      const toAdd: string[] = accesses
        .filter((access) => personaAccess[access] === true)
        .map((access) => `${this.resource.name}/${access}`);
      _set(result, `testPersonas[${persona}].access`, toAdd.length > 0 ? [...toAdd, ...accessForNonRelevantViews] : []);
      _set(result, `testPersonas[${persona}].addAccess`, undefined);
      _set(result, `testPersonas[${persona}].removeAccess`, undefined);
    });

    return result;
  }

  emitChange() {
    this.change.emit(this.form.value);
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
        const resourceRelevantAddAccess = addAccess.filter((access) => access.includes(this.resource.name));
        setError([persona, resourceRelevantAddAccess]);
        const resourceRelevantRemoveAccess = removeAccess.filter((access) => access.includes(this.resource.name));
        setError([persona, resourceRelevantRemoveAccess]);
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
