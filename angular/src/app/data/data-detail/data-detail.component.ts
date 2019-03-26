import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { flatMap } from 'rxjs/operators';

import { EntityModel } from '../../admin/shared/entity.model';
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
  resourceLabel$: Observable<string>;
  searchOpened = false;
  views: any;
  accessError: any = null;
  resource: EntityModel;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private searchStateService: SearchStateService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.dataService.getResource(params['resourceName']))
    ).subscribe((resource: EntityModel) => {
      this.resource = resource;
      this.searchStateService.patch({
        resource: resource.name,
        limitSearch: true,
      });
      this.resourceLabel$ = of(this.resource.dto.ui.label);
      this.views = this.getViews(this.resource);
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
    const view = this.resource.dto.views[viewName];

    view.account = account;
    view.token = token;

    // tslint:disable-next-line
    const viewAccessUrl = view!.interfaces['http:gcp:gs']!.uri![0];
    if (viewAccessUrl) {
      view.url = `${viewAccessUrl}/o?access_token=${token}`;
    }
  }

  private getViews(resource: EntityModel): EntityModel[] {
    return Object
      .keys(resource.dto.views)
      .map((key) => new EntityModel(key, resource.dto.views[key]));
  }

}
