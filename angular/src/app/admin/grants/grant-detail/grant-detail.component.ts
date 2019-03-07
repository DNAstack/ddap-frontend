import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-detail',
  templateUrl: './grant-detail.component.html',
  styleUrls: ['./grant-detail.component.scss'],
})
export class GrantDetailComponent extends EntityDetailBase<GrantService> {

  constructor(
    route: ActivatedRoute,
    grantService: GrantService
  ) {
    super(route, grantService, 'grantName');
  }
}
