import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent extends EntityDetailBase<ClientService> {
  constructor(
    route: ActivatedRoute,
    clientService: ClientService
  ) {
    super(route, clientService, 'clientName');
  }
}
