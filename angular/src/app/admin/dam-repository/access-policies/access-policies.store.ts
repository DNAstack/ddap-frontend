import { Injectable } from '@angular/core';

import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { DamConfigEntityStore } from '../shared/dam/dam-config-entity-store';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import { DamConfigStore } from '../shared/dam/dam-config.store';

@Injectable({
  providedIn: 'root',
})
export class AccessPoliciesStore extends DamConfigEntityStore {

  constructor(protected damConfigStore: DamConfigStore,
              protected damInfoService: DamInfoService) {
    super(DamConfigEntityType.policies, damConfigStore, damInfoService);
  }

}
