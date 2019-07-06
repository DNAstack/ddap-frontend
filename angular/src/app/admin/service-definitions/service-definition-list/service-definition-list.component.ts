import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { ServiceDefinitionService } from '../service-definitions.service';

@Component({
  selector: 'ddap-service-definition-list',
  templateUrl: './service-definition-list.component.html',
  styleUrls: ['./service-definition-list.component.scss'],
})
export class ServiceDefinitionListComponent extends DamEntityListBase<ServiceDefinitionService> {

  constructor(protected serviceDefinitionService: ServiceDefinitionService, protected route: ActivatedRoute) {
    super(serviceDefinitionService, route);
  }

}
