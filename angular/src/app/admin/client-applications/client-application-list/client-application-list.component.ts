import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-list',
  templateUrl: './client-application-list.component.html',
  styleUrls: ['./client-application-list.component.scss'],
})
export class ClientApplicationListComponent extends DamEntityListBase<ClientApplicationService> {

  constructor(service: ClientApplicationService, route: ActivatedRoute) {
    super(service, route);
  }

}
