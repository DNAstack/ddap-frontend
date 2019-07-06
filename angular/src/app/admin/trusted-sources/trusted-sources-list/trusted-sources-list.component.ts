import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-list',
  templateUrl: './trusted-sources-list.component.html',
  styleUrls: ['./trusted-sources-list.component.scss'],
})
export class TrustedSourcesListComponent extends DamEntityListBase<TrustedSourcesService> {

  constructor(protected trustedSourcesService: TrustedSourcesService, protected route: ActivatedRoute) {
    super(trustedSourcesService, route);
  }

}
