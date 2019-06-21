import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { ClaimDefinitionService } from '../../admin/claim-definitions/claim-definitions.service';
import { dam } from '../proto/dam-service';
import { ic } from '../proto/ic-service';
import GA4GHClaim = dam.v1.TestPersona.GA4GHClaim;
import { TimeDurationParser } from '../time-duration.parser';
import AccountClaim = ic.v1.AccountClaim;
import AccountClaimList = ic.v1.AccountClaimList;
import IAccountClaim = ic.v1.IAccountClaim;

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
  standardClaims: ({ [k: string]: string } | null);
  @Input()
  ga4ghClaims: GA4GHClaim[];
  @Input()
  ga4ghAccountClaims: { [k: string]: AccountClaimList };

  constructor(public claimService: ClaimDefinitionService) {
  }

  getFormattedExpiresTextFromClaim({ expiresDuration }: GA4GHClaim): string {
    if (!expiresDuration) {
      return;
    }

    const duration = TimeDurationParser.parseAsDuration(expiresDuration);
    return `Expires every ${duration.value} ${duration.unitOfTime}`;
  }

  getFormattedExpiresTextFromAccountClaim({ expires }: IAccountClaim | AccountClaim): string {
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
