import { Injectable } from '@angular/core';

import { IcConfigEntityStore } from '../../shared/ic/ic-config-entity-store';
import { IcConfigEntityType } from '../../shared/ic/ic-config-entity-type.enum';
import { IcConfigStore } from '../../shared/ic/ic-config.store';


@Injectable({
  providedIn: 'root',
})
export class IdentityProvidersStore extends IcConfigEntityStore {

  constructor(protected icConfigStore: IcConfigStore) {
    super(IcConfigEntityType.identityProviders, icConfigStore);
  }

}
