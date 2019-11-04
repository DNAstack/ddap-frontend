import { Component, Input } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { TimeDurationParser } from 'ddap-common-lib';

import { ClaimDefinitionService } from '../../admin/dam-repository/claim-definitions/claim-definitions.service';
import { common } from '../proto/dam-service';

import Assertion = common.Assertion;

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
  ga4ghClaims: Assertion[];
  @Input()
  ga4ghAccountPassport: { [k: string]: any };

  constructor(public claimService: ClaimDefinitionService) {
    dayjs.extend(relativeTimePlugin);
  }

  getFormattedExpiresTextFromClaim({ expiresDuration }: Assertion): string {
    if (!expiresDuration) {
      return;
    }

    const duration = TimeDurationParser.parseAsDuration(expiresDuration);
    return `Expires every ${duration.value} ${duration.unitOfTime}`;
  }

  getFormattedExpiresTextFromAccountClaim({ exp }: any): string {
    if (!exp) {
      return;
    }

    const timestamp = dayjs.unix(exp);
    const relativeTime = timestamp.fromNow();
    return timestamp.isBefore(dayjs())
      ? `Expired ${relativeTime}`
      : `Expires ${relativeTime}`;
  }

}
