import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';
import { ConfigModificationModel, EntityModel } from 'ddap-common-lib';

import { IcConfigEntityDetailComponentBase } from '../../shared/ic/ic-config-entity-detail-component.base';
import { IcConfigStore } from '../../shared/ic/ic-config.store';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../clients.service';
import { ClientsStore } from '../clients.store';

@Component({
  selector: 'ddap-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [FormValidationService],
})
export class ClientDetailComponent extends IcConfigEntityDetailComponentBase<ClientsStore> implements OnInit {

  @ViewChild(ClientFormComponent, { static: false })
  clientForm: ClientFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected icConfigStore: IcConfigStore,
              protected clientsStore: ClientsStore,
              private clientService: ClientService) {
    super(route, router, validationService, icConfigStore, clientsStore);
  }

  update() {
    if (!this.validate(this.clientForm)) {
      return;
    }

    const clientApplication: EntityModel = this.clientForm.getModel();
    const change = new ConfigModificationModel(clientApplication.dto, {});
    this.clientService.update(this.entity.name, change)
      .subscribe(() => this.navigateUp('..'), this.showError);
  }

  delete() {
    this.clientService.remove(this.entity.name)
      .subscribe(() => this.navigateUp('..'), this.showError);
  }

}
