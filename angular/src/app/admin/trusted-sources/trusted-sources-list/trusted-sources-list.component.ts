import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamConfigEntityListComponentBase } from '../../shared/dam/dam-config-entity-list-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { TrustedSourcesStore } from '../trusted-sources.store';

@Component({
  selector: 'ddap-trusted-source-list',
  templateUrl: './trusted-sources-list.component.html',
  styleUrls: ['./trusted-sources-list.component.scss'],
})
export class TrustedSourcesListComponent extends DamConfigEntityListComponentBase<TrustedSourcesStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected trustedSourcesStore: TrustedSourcesStore) {
    super(route, damConfigStore, trustedSourcesStore);
  }

}
