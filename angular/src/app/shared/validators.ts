import { AbstractControl } from '@angular/forms';

export class FormValidators {

  static url(control: AbstractControl) {
    if (!control || !control.value || control.value === '') {
      return null;
    }

    const { value } = control;
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return null;
    }

    return {
      url: true,
    };
  }

}
