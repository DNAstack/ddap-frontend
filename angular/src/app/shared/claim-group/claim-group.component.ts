import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { ClaimDefinitionService } from '../../admin/claim-definitions/claim-definitions.service';
import { dam } from '../proto/dam-service';
import GA4GHClaim = dam.v1.TestPersona.GA4GHClaim;

@Component({
  selector: 'ddap-claim-group',
  templateUrl: './claim-group.component.html',
  styleUrls: ['./claim-group.component.scss'],
  providers: [ClaimDefinitionService],
})
export class ClaimGroupComponent {

  @Input()
  claimGroupLabel: string;
  @Input()
  standardClaims: ({ [k: string]: string }|null);
  @Input()
  ga4ghClaims: GA4GHClaim[];

  constructor(public claimService: ClaimDefinitionService) {
  }

  getFormattedExpiresTextFromClaim({ expires }: GA4GHClaim): string {
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
