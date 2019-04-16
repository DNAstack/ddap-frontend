import { Injectable, Injector } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PassportIssuerService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'trustedPassportIssuers', 'trustedPassportIssuers', {
      '=1': 'passport issuer',
      'other': 'passport issuers',
    });
  }

}
