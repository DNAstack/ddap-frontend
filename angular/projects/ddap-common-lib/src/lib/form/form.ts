import { FormGroup } from '@angular/forms';

export interface Form {
  getAllForms(): FormGroup[];
  isValid(): boolean;
}

export function combineForms(...forms: Form[]): Form {
  return new class implements Form {
    getAllForms(): FormGroup[] {
      return forms.map(f => f.getAllForms())
        .reduce((prev, cur) => cur.concat(prev));
    }

    isValid(): boolean {
      return forms.map(f => f.isValid())
        .reduce((prev, cur) => prev && cur);
    }
  };
}

export default Form;
