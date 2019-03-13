import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { ServiceTemplateService } from '../service-templates.service';

@Component({
  selector: 'ddap-service-template-manage',
  templateUrl: './service-template-manage.component.html',
  styleUrls: ['./service-template-manage.component.scss'],
})
export class ServiceTemplateManageComponent extends EntityManageBase<ServiceTemplateService> {

  constructor(serviceTemplateService: ServiceTemplateService,
              router: Router,
              route: ActivatedRoute) {
    super(serviceTemplateService, router, route);
  }
}
