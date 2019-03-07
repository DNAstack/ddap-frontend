import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss'],
})
export class ClientManageComponent extends EntityManageBase<ClientService> {

  constructor(clientService: ClientService,
              router: Router,
              route: ActivatedRoute) {
    super(clientService, router, route);
  }
}
