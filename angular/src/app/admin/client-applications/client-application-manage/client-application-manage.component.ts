import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormValidationService } from '../../../shared/form-validation.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { ClientApplicationFormComponent } from '../client-application-form/client-application-form.component';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-manage',
  templateUrl: './client-application-manage.component.html',
  styleUrls: ['./client-application-manage.component.scss'],
})
export class ClientApplicationManageComponent {

  @ViewChild(ClientApplicationFormComponent)
  clientApplicationForm: ClientApplicationFormComponent;

  submitted = false;

  constructor(
    public service: ClientApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private formValidation: FormValidationService) {

  }

  save() {
    if (!this.clientApplicationForm.form.valid) {
      this.formValidation.forceValidate(this.clientApplicationForm.form);
      this.submitted = true;
      return;
    }

    const clientApplication: EntityModel = this.clientApplicationForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.service.save(clientApplication.name, change)
      .subscribe(
        () => this.router.navigate(['../..'], {relativeTo: this.route})
      );
  }
}
