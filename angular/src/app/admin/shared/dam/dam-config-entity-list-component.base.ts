import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { EntityModel } from '../entity.model';

import { DamConfigEntityComponentBase } from './dam-config-entity-component.base';
import { DamConfigEntityType } from './dam-config-entity-type.enum';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityListComponentBase extends DamConfigEntityComponentBase implements OnInit {

  entities$: Observable<EntityModel[]>;

  constructor(protected entityType: DamConfigEntityType,
              protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore) {
    super(route);
  }

  ngOnInit() {
    this.damConfigStore.init(this.damId);
    this.entities$ = this.damConfigStore.state$
      .pipe(
        pluck(this.damId, this.entityType),
        map(EntityModel.objectToMap),
        map(EntityModel.arrayFromMap)
      );
  }
}
