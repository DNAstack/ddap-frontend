import { Component, Input } from '@angular/core';

import { BeaconResponse } from '../beacon-response.model';

@Component({
  selector: 'ddap-beacon-result',
  templateUrl: './beacon-result.component.html',
  styleUrls: ['./beacon-result.component.scss'],
})
export class BeaconResultComponent {

  @Input()
  realm: string;
  @Input()
  beacon: BeaconResponse;

  metadataNotEmpty() {
    return this.beacon.info && Object.keys(this.beacon.info).length > 0;
  }

  getLinkToResource() {
    return `/${this.realm}/data/${this.beacon.resource}`;
  }

}
