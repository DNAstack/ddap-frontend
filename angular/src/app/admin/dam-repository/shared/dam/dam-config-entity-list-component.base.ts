import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';

import { DamConfigEntityComponentBase } from './dam-config-entity-component.base';
import { DamConfigEntityStore } from './dam-config-entity-store';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityListComponentBase<T extends DamConfigEntityStore> extends DamConfigEntityComponentBase implements OnInit {

  entities$: Observable<EntityModel[]>;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected entityDamConfigStore: T) {
    super(route);
  }

  ngOnInit() {
    this.route.params.subscribe(() => this.damConfigStore.init(this.damId));
    this.entities$ = this.entityDamConfigStore.state$
      .pipe(
        pluck(this.damId),
        map(EntityModel.arrayFromMap)
      );
  }
}
