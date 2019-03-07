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

  getAccess(viewName) {
    this.entityService.getAccessRequestToken(this.entity.name, viewName)
      .subscribe((accessToken) => {
        this.entity.dto.views[viewName].token = accessToken;

        const view = this.entity.dto.views[viewName];
        // tslint:disable-next-line
        const viewAccessUrl = view!.interfaces['http:gcp:gs'];
        if (viewAccessUrl) {
          this.entity.dto.views[viewName].url = `${viewAccessUrl}/o?access_token=${accessToken}`;
        }
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
