import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IcConfigEntityListComponentBase } from '../../../shared/ic/ic-config-entity-list-component.base';
import { IcConfigStore } from '../../../shared/ic/ic-config.store';
import { IdentityProvidersStore } from '../identity-providers.store';

@Component({
  selector: 'ddap-identity-provider-list',
  templateUrl: './identity-provider-list.component.html',
  styleUrls: ['./identity-provider-list.component.scss'],
})
export class IdentityProviderListComponent extends IcConfigEntityListComponentBase<IdentityProvidersStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected icConfigStore: IcConfigStore,
              protected identityProvidersStore: IdentityProvidersStore) {
    super(icConfigStore, identityProvidersStore);
  }

}
