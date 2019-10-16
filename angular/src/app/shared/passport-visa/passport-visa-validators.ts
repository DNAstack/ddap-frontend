import { AbstractControl } from '@angular/forms';

import { PassportVisa } from './passport-visa.constant';
import ConditionPrefix = PassportVisa.ConditionPrefix;

export class PassportVisaValidators {

  static hasPrefix(control: AbstractControl) {
    if (!control || !control.value || control.value === '') {
      return null;
    }

    const { value } = control;
    const prefixes = Object.values(ConditionPrefix);
    if (prefixes.some((prefix) => value.startsWith(`${prefix}:`))) {
      return null;
    }

    return {
      prefix: true,
    };
  }

}
