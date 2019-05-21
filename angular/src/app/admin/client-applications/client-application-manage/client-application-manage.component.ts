import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { ClientApplicationFormComponent } from '../client-application-form/client-application-form.component';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-manage',
  templateUrl: './client-application-manage.component.html',
  styleUrls: ['./client-application-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientApplicationManageComponent {

  @ViewChild(ClientApplicationFormComponent)
  clientApplicationForm: ClientApplicationFormComponent;

  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(
    public service: ClientApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    public formError: FormErrorScrollService) {

  }

  save() {
    if (!this.formError.validate(this.clientApplicationForm, this.formErrorElement)) {
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
