import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BeaconResponse } from '../beacon-response.model';

@Component({
  selector: 'ddap-beacon-result',
  templateUrl: './beacon-result.component.html',
  styleUrls: ['./beacon-result.component.scss'],
})
export class BeaconResultComponent implements OnInit {

  @Input()
  beacon: BeaconResponse;

  realm: string;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
    });
  }

  getLinkToResource() {
    return `/${this.realm}/data/${this.beacon.resource.name}`;
  }

}
