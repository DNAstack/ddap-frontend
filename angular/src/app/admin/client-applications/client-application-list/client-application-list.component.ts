import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-list',
  templateUrl: './client-application-list.component.html',
  styleUrls: ['./client-application-list.component.scss'],
})
export class ClientApplicationListComponent extends EntityListBase<ClientApplicationService> {

  constructor(service: ClientApplicationService) {
    super(service);
  }

}
