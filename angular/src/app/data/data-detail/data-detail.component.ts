import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { EntityModel } from '../../admin/shared/entity.model';
import { ResourceBeaconService } from '../../shared/beacon-search/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { DataService } from '../data.service';

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
  limitSearch = true;
  damId: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit() {
    const resourceName = this.route.snapshot.params.resourceName;
    const realmId = this.route.root.firstChild.snapshot.params.realmId;
    this.damId = this.route.snapshot.params.damId;

    this.dataService.getResource(this.damId, resourceName, realmId)
      .subscribe((resource) => {
        this.resource = resource;
        this.resourceLabel$ = of(this.resource.dto.ui.label);
        this.views = this.getViews(this.resource);
      });
  }

  searchOpenedChange($event) {
    this.searchOpened = $event;
  }

  toggleLimitSearch() {
    this.limitSearch = !this.limitSearch;
  }

  private getViews(resource: EntityModel): EntityModel[] {
    return Object
      .keys(resource.dto.views)
      .map((key) => new EntityModel(key, resource.dto.views[key]));
  }
}
