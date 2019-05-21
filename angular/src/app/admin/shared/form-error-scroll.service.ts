import { ElementRef, Injectable } from '@angular/core';

import { FormValidationService } from '../../shared/form-validation.service';
import { ScrollService } from '../../shared/scroll.service';

import Form from './form';

@Injectable()
export class FormErrorScrollService {

  public showError = false;

  constructor(private formValidation: FormValidationService,
              private scroll: ScrollService) {

  }

  validate(formComponent: Form, formError: ElementRef): boolean {
    if (!formComponent.isValid()) {
      this.formValidation.forceValidateMultiple(formComponent.getAllForms());
      this.scroll.toElement(formError);
      this.showError = true;

      return false;
    }

    this.showError = false;

    return true;
  }
}
