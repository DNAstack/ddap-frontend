import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'ddap-claim-manage',
  templateUrl: './claim-manage.component.html',
  styleUrls: ['./claim-manage.component.scss'],
})
export class ClaimManageComponent extends EntityManageBase<ClaimService> {

  constructor(claimService: ClaimService,
              router: Router,
              route: ActivatedRoute) {
    super(claimService, router, route);
  }
}
