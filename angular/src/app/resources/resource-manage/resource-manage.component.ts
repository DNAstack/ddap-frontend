import { Component, OnInit } from '@angular/core';

import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss']
})
export class ResourceManageComponent implements OnInit {

  resource: any = {};

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.resourceService.addResource(JSON.parse(value.body))
      .subscribe(() => this.resource = {});
  }
}
