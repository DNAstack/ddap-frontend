import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs/operators';

import { EntityModel } from '../entity.model';

import { DamConfigEntityComponentBase } from './dam-config-entity-component.base';
import { DamConfigEntityType } from './dam-config-entity-type.enum';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityDetailComponentBase extends DamConfigEntityComponentBase implements OnInit {

  entity: EntityModel;

  constructor(protected entityType: DamConfigEntityType,
              protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore) {
    super(route);
  }

  get entityId() {
    return this.route.snapshot.params.entityId;
  }

  ngOnInit() {
    this.damConfigStore.init(this.damId);
    this.damConfigStore.state$
      .pipe(
        pluck(this.damId, this.entityType),
        map(EntityModel.objectToMap)
      ).subscribe((entity) => {
      this.entity = entity.get(this.entityId);
    });
  }

}
