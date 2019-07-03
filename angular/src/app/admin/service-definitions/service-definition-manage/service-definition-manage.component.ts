import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceDefinitionService } from '../service-definitions.service';

@Component({
  selector: 'ddap-service-definition-manage',
  templateUrl: './service-definition-manage.component.html',
  styleUrls: ['./service-definition-manage.component.scss'],
})
export class ServiceDefinitionManageComponent {

  constructor(private serviceDefinitionService: ServiceDefinitionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save(id, change) {
    this.serviceDefinitionService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
