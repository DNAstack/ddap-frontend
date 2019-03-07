import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss'],
})
export class ClaimListComponent extends EntityListBase<ClaimService> {

  constructor(private claimService: ClaimService) {
    super(claimService);
  }

}
