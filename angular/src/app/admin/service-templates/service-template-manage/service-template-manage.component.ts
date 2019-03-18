import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceTemplateService } from '../service-templates.service';

@Component({
  selector: 'ddap-service-template-manage',
  templateUrl: './service-template-manage.component.html',
  styleUrls: ['./service-template-manage.component.scss'],
})
export class ServiceTemplateManageComponent {

  constructor(private serviceTemplateService: ServiceTemplateService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save(id, change) {
    this.serviceTemplateService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
