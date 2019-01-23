import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResourceService } from '../resource.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
})
export class ResourceManageComponent implements OnInit {

  resource: any = {};

  constructor(private resourceService: ResourceService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.resourceService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/resources']));
  }
}
