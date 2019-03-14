import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { ClientApplicationService } from '../client-applications.service';

@Component({
  selector: 'ddap-client-application-detail',
  templateUrl: './client-application-detail.component.html',
  styleUrls: ['./client-application-detail.component.scss'],
})
export class ClientApplicationDetailComponent extends EntityDetailBase<ClientApplicationService> {

  constructor(
    route: ActivatedRoute,
    service: ClientApplicationService
  ) {
    super(route, service, 'clientName');
  }

}
