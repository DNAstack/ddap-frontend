import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
})
export class ClaimDetailComponent extends EntityDetailBase<ClaimService> {

  constructor(
    route: ActivatedRoute,
    claimService: ClaimService
  ) {
    super(route, claimService, 'claimName');
  }
}
