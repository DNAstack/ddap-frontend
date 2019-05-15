import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormValidationService } from '../../../shared/form-validation.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { ClientApplicationFormComponent } from '../client-application-form/client-application-form.component';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-detail',
  templateUrl: './client-application-detail.component.html',
  styleUrls: ['./client-application-detail.component.scss'],
})
export class ClientApplicationDetailComponent extends EntityDetailBase<ClientApplicationService> {

  @ViewChild(ClientApplicationFormComponent)
  clientApplicationForm: ClientApplicationFormComponent;

  constructor(route: ActivatedRoute,
              service: ClientApplicationService,
              private router: Router,
              private formValidation: FormValidationService) {
    super(route, service, 'clientName');
  }

  update() {
    if (!this.clientApplicationForm.form.valid) {
      this.formValidation.forceValidate(this.clientApplicationForm.form);
      return;
    }

    const clientApplication: EntityModel = this.clientApplicationForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

}
