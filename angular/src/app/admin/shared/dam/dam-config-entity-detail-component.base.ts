import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { EntityModel } from '../entity.model';

import { DamConfigEntityComponentBase } from './dam-config-entity-component.base';
import { DamConfigEntityStore } from './dam-config-entity-store';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityDetailComponentBase<T extends DamConfigEntityStore>
  extends DamConfigEntityComponentBase implements OnInit, OnDestroy {

  entity: EntityModel;

  private subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected entityDamConfigStore: T) {
    super(route);
  }

  get entityId() {
    return this.route.snapshot.params.entityId;
  }

  ngOnInit() {
    this.damConfigStore.init(this.damId);
    this.subscription = this.entityDamConfigStore.state$
      .pipe(
        pluck(this.damId),
        map((entities) => {
          if (entities) {
            return entities.get(this.entityId);
          }
        })
      ).subscribe((entity) => {
      this.entity = entity;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
