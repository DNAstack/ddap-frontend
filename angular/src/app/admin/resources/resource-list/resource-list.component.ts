import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent extends DamEntityListBase<ResourceService> implements OnInit {

  constructor(protected resourceService: ResourceService, protected route: ActivatedRoute) {
    super(resourceService, route);
  }

  displayableMetadata(ui: any[]): boolean {
    return !ui.every(({value}) => value === null || value === '');
  }

}
