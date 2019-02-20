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
  searchParams: any;

  results: any[];
  resultsAction: Subscription;

  constructor(private route: ActivatedRoute,
              private beaconService: ResourceBeaconService) {

  }

  limitSearch($event) {
    console.log('limitSearch', $event);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (params: any) => {
          this.searchParams = params;
          this.resource = params.resource;
          this.resultsAction = this.beaconService.queryResourceBeacons(params, params.resource)
            .subscribe((beaconResponseDto) => this.results = [beaconResponseDto]);
        });
  }
}
