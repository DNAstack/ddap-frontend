import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';
import { FormValidationService } from '../../../shared/form/form-validation.service';

import { DamConfigEntityFormComponentBase } from './dam-config-entity-form-component.base';
import { DamConfigEntityStore } from './dam-config-entity-store';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityDetailComponentBase<T extends DamConfigEntityStore>
  extends DamConfigEntityFormComponentBase implements OnInit, OnDestroy {

  entity: EntityModel;

  private subscription: Subscription;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              protected entityDamConfigStore: T) {
    super(route, router, validationService);
  }

  get entityId() {
    return this.route.snapshot.params.entityId;
  }

  ngOnInit() {
    this.damConfigStore.set(this.damId);
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
