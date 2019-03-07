import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ClientService } from '../clients.service';

@Component({
  selector: 'ddap-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent extends EntityListBase<ClientService> {

  constructor(clientService: ClientService) {
    super(clientService);
  }

}
