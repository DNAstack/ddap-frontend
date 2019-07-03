import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ServiceDefinitionService } from '../service-definitions.service';

@Component({
  selector: 'ddap-service-definition-list',
  templateUrl: './service-definition-list.component.html',
  styleUrls: ['./service-definition-list.component.scss'],
})
export class ServiceDefinitionListComponent extends EntityListBase<ServiceDefinitionService> {

  constructor(serviceDefinitionService: ServiceDefinitionService) {
    super(serviceDefinitionService);
  }

}
