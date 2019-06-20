import { ElementRef, Injectable } from '@angular/core';

import { FormValidationService } from '../../shared/form-validation.service';
import { ScrollService } from '../../shared/scroll.service';

import Form from './form';

@Injectable()
export class FormErrorScrollService {

  public showError = false;
  public message: string;

  constructor(private formValidation: FormValidationService,
              private scroll: ScrollService) {

  }

  validate(formComponent: Form, formError: ElementRef): boolean {
    if (!formComponent.isValid()) {
      const validationErrorMessage = 'Please fix invalid fields (marked red) before saving the resource.';
      this.formValidation.forceValidateMultiple(formComponent.getAllForms());
      this.displayErrorMessage(formError, validationErrorMessage);

      return false;
    }

    this.showError = false;

    return true;
  }

  displayErrorMessage(formError: ElementRef, validationErrorMessage: string) {
    this.scroll.toElement(formError);
    this.showError = true;
    this.message = validationErrorMessage;
  }
}
