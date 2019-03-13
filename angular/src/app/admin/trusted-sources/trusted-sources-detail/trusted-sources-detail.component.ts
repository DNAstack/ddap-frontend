import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-detail',
  templateUrl: './trusted-sources-detail.component.html',
  styleUrls: ['./trusted-sources-detail.component.scss'],
})
export class TrustedSourcesDetailComponent extends EntityDetailBase<TrustedSourcesService> {

  constructor(
    route: ActivatedRoute,
    trustedSourcesService: TrustedSourcesService
  ) {
    super(route, trustedSourcesService, 'trustedSourceName');
  }
}
