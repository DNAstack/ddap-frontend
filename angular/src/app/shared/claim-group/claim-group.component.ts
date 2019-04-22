import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { dam } from '../proto/dam-service';
import IGA4GHClaim = dam.v1.TestPersona.IGA4GHClaim;

@Component({
  selector: 'ddap-claim-group',
  templateUrl: './claim-group.component.html',
  styleUrls: ['./claim-group.component.scss'],
})
export class ClaimGroupComponent {

  @Input()
  claimGroupLabel: string;
  @Input()
  standardClaims: ({ [k: string]: string }|null);
  @Input()
  ga4ghClaims: IGA4GHClaim[];

  getFormattedExpiresTextFromClaim({ expires }: IGA4GHClaim) {
    if (!expires) {
      return;
    }

    const timestamp = moment.unix(expires);
    const relativeTime = timestamp.fromNow();
    return timestamp.isBefore(moment())
      ? `Expired ${relativeTime}`
      : `Expires ${relativeTime}`;
  }
}
