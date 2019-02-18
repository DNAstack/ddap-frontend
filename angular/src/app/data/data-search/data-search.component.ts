import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.searchParams = params;
      });
  }
}
