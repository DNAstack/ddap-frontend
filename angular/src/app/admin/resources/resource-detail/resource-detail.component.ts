import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailComponent extends EntityDetailBase<ResourceService> implements OnInit {

  views: Array<any>;

  constructor(route: ActivatedRoute, resourceService: ResourceService) {
    super(route, resourceService, 'resourceName');
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.entityService.getResource(params['resourceName']))
    ).subscribe((resource) => {
      this.entity = resource;
      this.views = this.getViews(resource);
    });
  }

  private getViews(resource: EntityModel) {
    return Object
      .keys(resource.dto.views)
      .map((key) => {
        return {
          ...resource.dto.views[key],
        };
      });
  }
}
