import { FormGroup } from '@angular/forms';

export default interface Form {
  getAllForms(): FormGroup[];
  isValid(): boolean;
}
