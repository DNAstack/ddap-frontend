import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IcConfigEntityListComponentBase } from '../../shared/ic/ic-config-entity-list-component.base';
import { IcConfigStore } from '../../shared/ic/ic-config.store';
import { ClientsStore } from '../clients.store';

@Component({
  selector: 'ddap-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent extends IcConfigEntityListComponentBase<ClientsStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected icConfigStore: IcConfigStore,
              protected clientsStore: ClientsStore) {
    super(icConfigStore, clientsStore);
  }

}
