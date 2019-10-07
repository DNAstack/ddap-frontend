import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { EntityModel } from '../../../shared/entity.model';
import { FormValidationService } from '../../../shared/form/form-validation.service';

import { DamConfigEntityFormComponentBase } from './dam-config-entity-form-component.base';
import { DamConfigEntityStore } from './dam-config-entity-store';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityManageComponentBase extends DamConfigEntityFormComponentBase implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore ) {
    super(route, router, validationService);
  }

  ngOnInit() {
    this.damConfigStore.set(this.damId);
  }

}
