import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent extends EntityListBase<ResourceService> {

  constructor(resourceService: ResourceService) {
    super(resourceService);
  }

}
