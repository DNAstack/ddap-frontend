import { AbstractControl } from '@angular/forms';

export function ValidateVariant(control: AbstractControl) {
  const locusRegex = /^\s*(\w+)\s*:\s*(\d+.*)\s+([a-zA-Z]+)\s*>\s*([a-zA-Z]+)\s*$/g;
  const locus = control.value;

  if (!locus.match(locusRegex)) {
    return {validLocus: true};
  }

  return null;
}
