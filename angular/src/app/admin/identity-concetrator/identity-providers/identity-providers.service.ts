import { Injectable, Injector } from '@angular/core';

import { IcConfigEntityService } from '../shared/ic-config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityProviderService extends IcConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'identityProviders', 'identityProviders');
  }

}
