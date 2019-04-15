import { Injectable, Injector } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AccessPolicyService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'policies', 'policies');
  }
}
