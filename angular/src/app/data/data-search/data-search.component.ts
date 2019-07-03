import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BeaconSearchParams } from '../../shared/beacon-search-params.model';
import { BeaconResponse } from '../../shared/beacons/beacon-response.model';
import { BeaconServiceQuery, ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { DataService } from '../data.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss'],
  providers: [ImagePlaceholderRetriever, ResourceBeaconService],
})
export class DataSearchComponent implements OnDestroy, OnInit {

  resource: string;
  resourceName$:  Observable<string>;
  views: any;
  results: BeaconResponse[];
  resultsAction: Subscription;
  limitSearch = false;

  private searchStateSubscription: Subscription;
  private searchParams: BeaconSearchParams;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private beaconService: ResourceBeaconService,
              private router: Router) {
  }

  ngOnInit() {
    this.resultsAction = new Subscription();

    this.searchStateSubscription = this.activatedRoute.params
      .subscribe((searchState: BeaconSearchParams) => this.initializeComponentFields(searchState));
  }

  ngOnDestroy() {
    this.searchStateSubscription.unsubscribe();
  }

  limitSearchChange($event) {
    const limitSearch = $event.checked;
    const searchParams: BeaconSearchParams = {
      ...this.searchParams,
       // Don't put a boolean into this map, so that we are always pulling out the limitSearch as a string
      limitSearch: limitSearch + '',
    };
    this.router.navigate(['.', searchParams], {relativeTo: this.activatedRoute, replaceUrl: true});
  }

  private initializeComponentFields(searchParams: BeaconSearchParams) {
    this.resource = searchParams.resource;
    if (this.resource) {
      this.resourceName$ = this.dataService.getName(searchParams.damId, this.resource);
    }
    this.searchParams = searchParams;
    this.limitSearch = searchParams.limitSearch === 'true';
    const queryParams = {
      ...searchParams,
      limitSearch: this.limitSearch,
    };

    this.queryBeacon(queryParams);
  }

  private queryBeacon(queryParams: BeaconServiceQuery) {
    const beaconResult$ = this.beaconService.query(queryParams);

    this.resultsAction = beaconResult$
      .subscribe((beaconResponseDto: any) => {
          this.results = beaconResponseDto;
        }
      );
  }
}
