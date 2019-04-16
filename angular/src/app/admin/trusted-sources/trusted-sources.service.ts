import { Injectable, Injector } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class TrustedSourcesService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'trustedSources', 'trustedSources', {
      '=1': 'trusted sources',
      'other': 'trusted sources',
    });
  }

}
