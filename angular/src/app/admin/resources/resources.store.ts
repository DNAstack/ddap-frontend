import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';


import { DamInfoService } from '../../shared/dam/dam-info.service';
import { DamConfigEntityStore } from '../shared/dam/dam-config-entity-store';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import { DamConfigStore } from '../shared/dam/dam-config.store';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ResourcesStore extends DamConfigEntityStore {

  constructor(protected damConfigStore: DamConfigStore,
              protected damInfoService: DamInfoService) {
    super(DamConfigEntityType.resources, damConfigStore, damInfoService);
  }

}
