import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import Form from '../../../shared/form/form';
import { FormValidationService } from '../../../shared/form/form-validation.service';

import { IcConfigEntityComponentBase } from './ic-config-entity-component.base';

export class IcConfigEntityFormComponentBase extends IcConfigEntityComponentBase {

  formErrorMessage: string;
  isFormValid: boolean;
  isFormValidated: boolean;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService) {
    super();
  }

  protected validate(form: Form): boolean {
    this.formErrorMessage = null;
    this.isFormValid = this.validationService.validate(form);
    this.isFormValidated = true;
    return this.isFormValid;
  }

  protected navigateUp = (path: string) => this.router.navigate([path], { relativeTo: this.route });

  protected showError = ({ error }: HttpErrorResponse) => {
    this.formErrorMessage = (error instanceof Object) ? JSON.stringify(error) : error;
    this.isFormValid = false;
    this.isFormValidated = true;
  }



}
