import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { TrustedSourcesService } from '../../../trusted-sources/trusted-sources.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientManageComponent {

  @ViewChild(ClientFormComponent)
  clientForm: ClientFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(private client: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
  }

  save() {
    if (!this.formError.validate(this.clientForm, this.formErrorElement)) {
      return;
    }

    const clientModel: EntityModel = this.clientForm.getModel();
    const change = new ConfigModificationObject(clientModel.dto, {});

    this.client.save(clientModel.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });
  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }
}
