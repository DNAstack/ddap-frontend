import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { ConfigModificationModel } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { ClientApplicationFormComponent } from '../client-application-form/client-application-form.component';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-manage',
  templateUrl: './client-application-manage.component.html',
  styleUrls: ['./client-application-manage.component.scss'],
  providers: [FormValidationService],
})
export class ClientApplicationManageComponent extends DamConfigEntityFormComponentBase {

  @ViewChild(ClientApplicationFormComponent, { static: false })
  clientApplicationForm: ClientApplicationFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              private clientApplicationService: ClientApplicationService) {
    super(route, router, validationService);
  }

  save() {
    if (!this.validate(this.clientApplicationForm)) {
      return;
    }

    const clientApplication: EntityModel = this.clientApplicationForm.getModel();
    const change = new ConfigModificationModel(clientApplication.dto, {});
    this.clientApplicationService.save(this.damId, clientApplication.name, change)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

}
