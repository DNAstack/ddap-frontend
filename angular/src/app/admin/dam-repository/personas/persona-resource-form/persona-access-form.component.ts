import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import _get from 'lodash.get';

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

  getModel() {
    const isViewAllowed = ([_, isAllowed]) => isAllowed;
    const getAccessName = ([accessName, _]) => accessName;

    return Object.entries(this.form.value)
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

  validateAccessFields(personaId, {error}) {
    const resourcesFormGroup = this.form;
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
}
