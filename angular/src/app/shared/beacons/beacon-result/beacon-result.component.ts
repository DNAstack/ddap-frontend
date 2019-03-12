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

  // TODO: https://dnastack.atlassian.net/browse/DISCO-2046
  metadata: {[key: string]: string} = {
    'Allele origin': 'Germline',
    'Assertion method': 'ENIGMA BRCA1/2 Classification Criteria (2015)',
    'Clinical significance': 'Pathogenic',
    'Reference sequence': 'NM_000059.3',
  };

  getLinkToResource() {
    return `/${this.realm}/data/${this.beacon.resource}`;
  }

}
