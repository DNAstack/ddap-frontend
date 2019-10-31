import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from 'ddap-common-lib';
import { FormValidationService } from 'ddap-common-lib';

import { DamConfigEntityComponentBase } from './dam-config-entity-component.base';

export class DamConfigEntityFormComponentBase extends DamConfigEntityComponentBase {

  formErrorMessage: string;
  isFormValid: boolean;
  isFormValidated: boolean;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService) {
    super(route);
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
