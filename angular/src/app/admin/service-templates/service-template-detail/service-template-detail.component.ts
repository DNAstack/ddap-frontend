import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { ServiceTemplateService } from '../service-templates.service';

@Component({
  selector: 'ddap-grant-detail',
  templateUrl: './service-template-detail.component.html',
  styleUrls: ['./service-template-detail.component.scss'],
})
export class ServiceTemplateDetailComponent extends EntityDetailBase<ServiceTemplateService> {

  constructor(
    route: ActivatedRoute,
    serviceTemplateService: ServiceTemplateService
  ) {
    super(route, serviceTemplateService, 'grantName');
  }
}
