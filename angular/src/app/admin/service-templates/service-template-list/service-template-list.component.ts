import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ServiceTemplateService } from '../service-templates.service';

@Component({
  selector: 'ddap-service-template-list',
  templateUrl: './service-template-list.component.html',
  styleUrls: ['./service-template-list.component.scss'],
})
export class ServiceTemplateListComponent extends EntityListBase<ServiceTemplateService> {

  constructor(serviceTemplateService: ServiceTemplateService) {
    super(serviceTemplateService);
  }

}
