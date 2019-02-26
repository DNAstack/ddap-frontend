import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';
import { SearchState } from '../../shared/search-state.model';
import { SearchStateService } from '../../shared/search-state.service';
import { DataService } from '../data.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss'],
  providers: [ImagePlaceholderRetriever, ResourceBeaconService],
})
export class DataSearchComponent implements OnInit {

  limitSearch = false;
  resource: string;
  resourceName$:  Observable<string>;
  views: any;
  results: any[];
  resultsAction: Subscription;

  constructor(private dataService: DataService,
              private searchStateService: SearchStateService,
              private beaconService: ResourceBeaconService) {

  }

  ngOnInit() {
    this.resultsAction = new Subscription();

    this.searchStateService.searchState
      .subscribe(
        (searchState: SearchState) => this.initializeComponentFields(searchState));
  }

  limitSearchChange($event) {
    this.searchStateService.patch({limitSearch: $event.checked});
  }

  private initializeComponentFields(searchParams: SearchState) {
    this.limitSearch = searchParams.limitSearch;
    this.resource = searchParams.resource;
    this.resourceName$ = this.dataService.getName(this.resource);

    this.queryBeacon(searchParams);
  }

  private queryBeacon(searchParams: SearchState) {
    const { limitSearch, resource  } = searchParams;
    const beaconResult = this.beaconService.query(searchParams, limitSearch ? resource : null);

    this.resultsAction = beaconResult
      .subscribe((beaconResponseDto: any) => {
          this.results = beaconResponseDto;
        }
      );
  }
}
