import { AbstractControl } from '@angular/forms';

import { DnaChangeQueryParser } from '../dna-change-query.parser';

export class VariantValidators {

  static variant(control: AbstractControl) {
    if (!DnaChangeQueryParser.validate(control.value)) {
      return {validLocus: true};
    }

    return {
      validLocus: true,
    };
  }

}
