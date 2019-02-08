import { Component, Input } from '@angular/core';

import { BeaconResponse } from '../beacon-response.model';

@Component({
  selector: 'ddap-beacon-result',
  templateUrl: './beacon-result.component.html',
  styleUrls: ['./beacon-result.component.scss'],
})
export class BeaconResultComponent {

  @Input()
  beacon: BeaconResponse;

}
