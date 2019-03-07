import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-manage',
  templateUrl: './grant-manage.component.html',
  styleUrls: ['./grant-manage.component.scss'],
})
export class GrantManageComponent extends EntityManageBase<GrantService> {

  constructor(grantService: GrantService,
              router: Router,
              route: ActivatedRoute) {
    super(grantService, router, route);
  }
}
