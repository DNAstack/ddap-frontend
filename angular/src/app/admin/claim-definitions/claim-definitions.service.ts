import { Injectable, Injector } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClaimDefinitionService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'claimDefinitions', 'claimDefinitions', {
      '=1': 'claim definition',
      'other': 'claim definitions',
    });
  }

}
