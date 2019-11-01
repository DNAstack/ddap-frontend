import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityModel } from 'ddap-common-lib';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

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
    this.route.params.subscribe(() => this.damConfigStore.set(this.damId));
    this.entities$ = this.entityDamConfigStore.state$
      .pipe(
        pluck(this.damId),
        map(EntityModel.arrayFromMap)
      );
  }
}
