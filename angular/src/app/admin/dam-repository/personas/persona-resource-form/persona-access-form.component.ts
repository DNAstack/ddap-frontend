import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import _get from 'lodash.get';

import { flatten } from '../../../../shared/util';

@Component({
  selector: 'ddap-persona-access-form',
  templateUrl: './persona-access-form.component.html',
  styleUrls: ['./persona-access-form.component.scss'],
})
export class PersonaAccessFormComponent {

  @Input()
  resources: any[];
  @Input()
  form: FormGroup;

  getModel(): string[] {
    return flatten(Object.entries(this.form.value)
      .map(([resource, viewAccess]) => {
        return flatten(Object.entries(viewAccess)
          .filter(([_, hasAccess]) => hasAccess)
          .map(([viewRole, _]) => {
            return [`${resource}/${viewRole}`];
          }));
    }));
  }

  validateAccessFields(personaId, {error}) {
    const fieldsToAdd: string[] = _get(error, `testPersonas[${personaId}].addAccess`, []);
    const fieldsToRemove: string[] = _get(error, `testPersonas[${personaId}].removeAccess`, []);

    fieldsToAdd.forEach(this.setError);
    fieldsToRemove.forEach(this.setError);
  }

  makeAccessFieldsValid() {
    const resourcesFormGroup = this.form;

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

  private setError = (resourceAccess: string) => {
    const resourceName = resourceAccess.substr(0, resourceAccess.indexOf('/'));
    const accessViewRole = resourceAccess.replace(`${resourceName}/`, '');
    const accessRoleCheckbox = this.form.get(resourceName).get(accessViewRole);
    accessRoleCheckbox.setErrors({ 'Doesn\'t match role criteria': true });
  }
}
