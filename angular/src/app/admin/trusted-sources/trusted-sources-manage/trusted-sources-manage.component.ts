import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-manage',
  templateUrl: './trusted-sources-manage.component.html',
  styleUrls: ['./trusted-sources-manage.component.scss'],
})
export class TrustedSourcesManageComponent extends EntityManageBase<TrustedSourcesService> {

  constructor(trustedSourcesService: TrustedSourcesService,
              router: Router,
              route: ActivatedRoute) {
    super(trustedSourcesService, router, route);
  }
}
