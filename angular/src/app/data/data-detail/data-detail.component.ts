import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { EntityModel } from '../../admin/shared/entity.model';
import { ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { SearchStateService } from '../../shared/search-state.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss'],
  providers: [ImagePlaceholderRetriever, ResourceBeaconService],
})
export class DataDetailComponent implements OnInit {

  resourceLabel$: Observable<string>;
  searchOpened = false;
  views: any;
  resource: EntityModel;

  constructor(private route: ActivatedRoute,
              public searchService: SearchStateService) {
  }

  ngOnInit() {
    this.searchService.limitSearch = true;

    this.route.data.subscribe(({resource}) => {
      this.resource = resource;
      this.searchService.resource = resource.name;
      this.resourceLabel$ = of(this.resource.dto.ui.label);
      this.views = this.getViews(this.resource);
    });
  }

  limitSearchChange($event) {
    this.searchService.limitSearch = $event.checked;
  }

  searchOpenedChange($event) {
    this.searchOpened = $event;
  }

  private getViews(resource: EntityModel): EntityModel[] {
    return Object
      .keys(resource.dto.views)
      .map((key) => new EntityModel(key, resource.dto.views[key]));
  }
}
