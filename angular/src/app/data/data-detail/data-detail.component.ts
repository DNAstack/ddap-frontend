import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { DataService } from '../data.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss'],
  providers: [ImagePlaceholderRetriever, ResourceBeaconService],
})
export class DataDetailComponent implements OnInit {

  resource: any;
  views: any;
  accessError: any = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.dataService.getResource(params['resourceName']))
    ).subscribe((resource) => {
      this.resource = resource;
      this.views = this.getViews(resource);
    });
  }

  getAccess(viewName) {
    this.dataService.getAccessRequestToken(this.resource.name, viewName)
      .subscribe(
        (accessToken) => this.mutateViewWithTokenAndUrl(viewName, accessToken),
        (error) => this.accessError = error
      );
  }

  private mutateViewWithTokenAndUrl(viewName, accessToken) {
    this.resource.views[viewName].token = accessToken;

    const view = this.resource.views[viewName];
    // tslint:disable-next-line
    const viewAccessUrl = view!.interfaces['http:gcp:gs'];
    if (viewAccessUrl) {
      this.resource.views[viewName].url = `${viewAccessUrl}/o?access_token=${accessToken}`;
    }
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
