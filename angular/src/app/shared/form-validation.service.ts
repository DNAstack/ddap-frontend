import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

// Inspired by https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {

  forceValidateMultiple(formGroups: FormGroup[]): void {
    formGroups.forEach((form) => this.forceValidate(form));
  }

  forceValidate(form: FormGroup) {
    if (!form.controls) {
      return;
    }

    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormArray) {
        Object.keys(form.controls).forEach(arrayField => {
          const arrayControl = form.get(arrayField) as FormGroup;
          this.forceValidate(arrayControl);
        });
      } else if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.forceValidate(control);
      }
    });
  }
}
