import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityDetailBase } from '../../../shared/entity-detail.base';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientDetailComponent extends EntityDetailBase<ClientService> implements OnInit {

  @ViewChild(ClientFormComponent)
  clientForm: ClientFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected client: ClientService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, client, 'clientName');
  }

  update() {
    if (!this.formError.validate(this.clientForm, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.clientForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });
  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
