import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { Observable } from 'rxjs/Observable';
import { map, share, take, takeWhile, tap } from 'rxjs/operators';

import { pick } from '../../../shared/autocomplete/autocomplete.util';
import { PersonaService } from '../../personas/personas.service';

@Component({
  selector: 'ddap-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
})
export class TestFormComponent implements OnChanges {

  @Input()
  resource: any;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  views: string[];
  personas: string[];
  form: FormGroup;

  private personas$: Observable<any>;

  constructor(private personaService: PersonaService,
              private formBuilder: FormBuilder) {
    this.personas$ = this.personaService
      .getList(pick('name'))
      .pipe(
        share()
      );
  }

  ngOnChanges(changes: SimpleChanges): void {

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
    });
  }

  toApplyDto() {
    const result = {};
    const personaList = Object.keys(this.form.value);

    personaList.forEach((persona) => {
      const personaAccess = this.form.value[persona];
      const accesses = Object.keys(personaAccess);

      const toAdd = accesses.filter((access) => personaAccess[access] === true);
      const toRemove = accesses.filter((access) => personaAccess[access] === false);

      if (toAdd.length) {
        _set(result, `testPersonas[${persona}]['addResources'][${this.resource.name}]['access']`, toAdd);
      }

      if (toRemove.length) {
        _set(result, `testPersonas[${persona}]['removeResources'][${this.resource.name}]['access']`, toRemove);
      }
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
}
