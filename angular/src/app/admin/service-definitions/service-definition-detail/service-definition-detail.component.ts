import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { ServiceDefinitionService } from '../service-definitions.service';

@Component({
  selector: 'ddap-service-definition-detail',
  templateUrl: './service-definition-detail.component.html',
  styleUrls: ['./service-definition-detail.component.scss'],
})
export class ServiceDefinitionDetailComponent extends EntityDetailBase<ServiceDefinitionService> {

  constructor(
    route: ActivatedRoute,
    serviceDefinitionService: ServiceDefinitionService
  ) {
    super(route, serviceDefinitionService, 'serviceDefinitionName');
  }
}
