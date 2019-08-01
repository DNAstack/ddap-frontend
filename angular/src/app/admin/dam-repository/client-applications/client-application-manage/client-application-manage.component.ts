import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { ClientApplicationFormComponent } from '../client-application-form/client-application-form.component';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-manage',
  templateUrl: './client-application-manage.component.html',
  styleUrls: ['./client-application-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientApplicationManageComponent extends DamConfigEntityComponentBase {

  @ViewChild(ClientApplicationFormComponent, { static: false })
  clientApplicationForm: ClientApplicationFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              private clientApplicationService: ClientApplicationService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route);
  }

  save() {
    if (!this.formError.validate(this.clientApplicationForm, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.clientApplicationForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.clientApplicationService.save(this.damId, clientApplication.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
