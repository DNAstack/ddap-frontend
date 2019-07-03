import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BeaconSearchParams } from '../../shared/beacon-search-params.model';
import { BeaconResponse } from '../../shared/beacons/beacon-response.model';
import { ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { SearchStateService } from '../../shared/search-state.service';
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

  private searchStateSubscription: Subscription;
  private searchParams: any;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private beaconService: ResourceBeaconService,
              private router: Router,
              public searchState: SearchStateService) {
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
    this.searchState.limitSearch = $event.checked;
    const searchParams = {
      ...this.searchParams,
      limitSearch: this.searchState.limitSearch,
    };
    this.router.navigate(['.', searchParams], {relativeTo: this.activatedRoute});
  }

  private initializeComponentFields(searchParams: BeaconSearchParams) {
    this.resource = searchParams.resource;
    // FIXME need to pull id from params
    this.resourceName$ = this.dataService.getName('1', this.resource);
    this.searchParams = searchParams;

    this.queryBeacon(searchParams);
  }

  private queryBeacon(searchParams: BeaconSearchParams) {
    const { limitSearch, resource  } = searchParams;
    const beaconResult$ = this.beaconService.query(searchParams, limitSearch ? resource : null);

    this.resultsAction = beaconResult$
      .subscribe((beaconResponseDto: any) => {
          this.results = beaconResponseDto;
        }
      );
  }
}
