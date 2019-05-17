import { ElementRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormValidationService } from '../../shared/form-validation.service';
import { ScrollService } from '../../shared/scroll.service';

@Injectable()
export class FormErrorScrollService {

  public showError = false;

  constructor(private formValidation: FormValidationService,
              private scroll: ScrollService) {

  }

  validate(form: FormGroup, formError: ElementRef): boolean {
    if (!form.valid) {
      this.formValidation.forceValidate(form);
      this.scroll.toElement(formError);
      this.showError = true;

      return false;
    }

    this.showError = false;

    return true;
  }
}
