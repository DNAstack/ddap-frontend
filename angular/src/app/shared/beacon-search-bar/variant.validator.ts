import { AbstractControl } from '@angular/forms';

import { DnaChangeQueryParser } from '../dna-change-query.parser';

export function ValidateVariant(control: AbstractControl) {
  const locus = control.value;

  if (!DnaChangeQueryParser.validate(locus)) {
    return {validLocus: true};
  }

  return null;
}
