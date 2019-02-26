import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { flatMap } from 'rxjs/operators';

import { ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { SearchStateService } from '../../shared/search-state.service';
import { DataService } from '../data.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss'],
  providers: [ImagePlaceholderRetriever, ResourceBeaconService],
})
export class DataDetailComponent implements OnInit {

  limitSearch = true;
  resource: any;
  resourceName$: Observable<string>;
  searchOpened = false;
  views: any;
  accessError: any = null;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private searchStateService: SearchStateService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.dataService.getResource(params['resourceName']))
    ).subscribe((resource) => {
      const resourceName = resource.name;
      this.searchStateService.patch({
        resource: resourceName,
        limitSearch: true,
      });
      this.resource = resource;
      this.resourceName$ = of(resource.ui.label);
      this.views = this.getViews(resource);
    });
  }

  getAccess(viewName) {
    this.dataService.getAccessRequestToken(this.resource.name, viewName)
      .subscribe(
        (response) => this.mutateViewWithTokenAndUrl(viewName, response),
        (error) => this.accessError = error
      );
  }

  limitSearchChange($event) {
    this.limitSearch = $event.checked;
    this.searchStateService.patch({
      limitSearch: this.limitSearch,
    });
  }

  searchOpenedChange($event) {
    this.searchOpened = $event;
  }

  private mutateViewWithTokenAndUrl(viewName, response) {
    const { account, token } = response;

    this.resource.views[viewName].account = account;
    this.resource.views[viewName].token = token;

    const view = this.resource.views[viewName];
    // tslint:disable-next-line
    const viewAccessUrl = view!.interfaces['http:gcp:gs'];
    if (viewAccessUrl) {
      this.resource.views[viewName].url = `${viewAccessUrl}/o?access_token=${token}`;
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
