import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';

import { IcConfigEntityComponentBase } from './ic-config-entity-component.base';
import { IcConfigEntityStore } from './ic-config-entity-store';
import { IcConfigStore } from './ic-config.store';

export class IcConfigEntityDetailComponentBase<T extends IcConfigEntityStore> extends IcConfigEntityComponentBase implements OnInit {

  entity: EntityModel;

  constructor(protected route: ActivatedRoute,
              protected icConfigStore: IcConfigStore,
              protected entityIcConfigStore: T) {
    super();
  }

  get entityId() {
    return this.route.snapshot.params.entityId;
  }

  ngOnInit() {
    this.icConfigStore.init();
    this.entityIcConfigStore.state$
      .pipe(
        map((entities) => {
          if (entities) {
            return entities.get(this.entityId);
          }
        })
      ).subscribe((entity) => {
      this.entity = entity;
    });
  }

}
