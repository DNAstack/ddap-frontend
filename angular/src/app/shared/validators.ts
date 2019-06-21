import { AbstractControl } from '@angular/forms';

import { TimeDurationParser } from './time-duration.parser';

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

  static duration(control: AbstractControl) {
    if (!control || !control.value || control.value === '') {
      return null;
    }

    const { value } = control;
    if (TimeDurationParser.validate(value)) {
      return null;
    }

    return {
      duration: true,
    };
  }

}
