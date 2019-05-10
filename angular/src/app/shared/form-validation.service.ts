import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

// Inspired by https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {

  forceValidate(formGroup: FormGroup) {
    if (!formGroup.controls) {
      return;
    }

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        Object.keys(formGroup.controls).forEach(arrayField => {
          const arrayControl = formGroup.get(arrayField) as FormGroup;
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
