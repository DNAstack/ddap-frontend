import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { ClientApplicationFormComponent } from '../client-application-form/client-application-form.component';
import { ClientApplicationService } from '../client-applications.service';
import { ClientApplicationsStore } from '../client-applications.store';

@Component({
  selector: 'ddap-client-application-detail',
  templateUrl: './client-application-detail.component.html',
  styleUrls: ['./client-application-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientApplicationDetailComponent extends DamConfigEntityDetailComponentBase<ClientApplicationsStore> implements OnInit {

  @ViewChild(ClientApplicationFormComponent, { static: false })
  clientApplicationForm: ClientApplicationFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected clientApplicationsStore: ClientApplicationsStore,
              private clientApplicationService: ClientApplicationService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, damConfigStore, clientApplicationsStore);
  }

  update() {
    if (!this.formError.validate(this.clientApplicationForm, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.clientApplicationForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.clientApplicationService.update(this.damId, this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.clientApplicationService.remove(this.damId, this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
