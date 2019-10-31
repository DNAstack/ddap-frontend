import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { DamConfigEntityFormComponentBase } from './dam-config-entity-form-component.base';
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
