import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailComponent implements OnInit {

  resource: any;
  views: any;

  constructor(private route: ActivatedRoute, public resourceService: ResourceService) {

  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.resourceService.getResource(params['resourceName']))
    ).subscribe((resource) => {
      this.resource = resource;
      this.views = this.getViews(resource);
    });
  }

  getAccess(viewName) {
    this.resourceService.getAccessRequestToken(this.resource.name, viewName)
      .subscribe((accessToken) => {
        this.resource.views[viewName].token = accessToken;

        const view = this.resource.views[viewName];
        // tslint:disable-next-line
        const viewAccessUrl = view!.interfaces['http:gcp:gs'];
        if (viewAccessUrl) {
          this.resource.views[viewName].url = `${viewAccessUrl}/o?access_token=${accessToken}`;
        }
      });
  }

  private getViews(resource) {
    return Object
      .keys(resource.views)
      .map((key) => {
        return {
          ...resource.views[key],
        };
      });
  }
}
