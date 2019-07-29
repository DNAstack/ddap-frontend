import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { ServiceDefinitionService } from '../service-definitions.service';

@Component({
  selector: 'ddap-service-definition-manage',
  templateUrl: './service-definition-manage.component.html',
  styleUrls: ['./service-definition-manage.component.scss'],
})
export class ServiceDefinitionManageComponent extends DamConfigEntityComponentBase {

  constructor(private serviceDefinitionService: ServiceDefinitionService,
              private router: Router,
              protected route: ActivatedRoute) {
    super(route);
  }

  save(id, change) {
    this.serviceDefinitionService.save(this.damId, id, change)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

}
