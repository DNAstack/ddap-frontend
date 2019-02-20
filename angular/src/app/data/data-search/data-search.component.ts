import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ResourceBeaconService } from '../../shared/beacons/resource-beacon.service';
import { ImagePlaceholderRetriever } from '../../shared/image-placeholder.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss'],
  providers: [ImagePlaceholderRetriever, ResourceBeaconService],
})
export class DataSearchComponent implements OnInit {

  resource: any;
  views: any;
  results: any[];
  resultsAction: Subscription;

  private searchParams;

  constructor(private route: ActivatedRoute,
              private beaconService: ResourceBeaconService) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (params: any) => {
          this.searchParams = params;
          this.resource = params.resource;
          this.query(params, params.resource);
        });
  }

  limitSearch($event) {
    if ($event.checked) {
      return this.query(this.searchParams, this.resource);
    }

    return this.query(this.searchParams, null);
  }

  private query(searchParams, resourceId) {
    this.resultsAction = this.beaconService.query(searchParams, resourceId)
      .subscribe((beaconResponseDto: any) => {
          this.results = beaconResponseDto;
        }
      );
  }
}
