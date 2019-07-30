import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { IcConfigEntityDetailComponentBase } from '../../../shared/ic/ic-config-entity-detail-component.base';
import { IcConfigStore } from '../../../shared/ic/ic-config.store';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../clients.service';
import { ClientsStore } from '../clients.store';

@Component({
  selector: 'ddap-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClientDetailComponent extends IcConfigEntityDetailComponentBase<ClientsStore> implements OnInit {

  @ViewChild(ClientFormComponent, { static: false })
  clientForm: ClientFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected icConfigStore: IcConfigStore,
              protected clientsStore: ClientsStore,
              private clientService: ClientService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, icConfigStore, clientsStore);
  }

  update() {
    if (!this.formError.validate(this.clientForm, this.formErrorElement)) {
      return;
    }

    const clientApplication: EntityModel = this.clientForm.getModel();
    const change = new ConfigModificationObject(clientApplication.dto, {});
    this.clientService.update(this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.clientService.remove(this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
