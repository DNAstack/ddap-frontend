import { OnInit } from '@angular/core';
import { EntityModel } from 'ddap-common-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IcConfigEntityComponentBase } from './ic-config-entity-component.base';
import { IcConfigEntityStore } from './ic-config-entity-store';
import { IcConfigStore } from './ic-config.store';

export class IcConfigEntityListComponentBase<T extends IcConfigEntityStore> extends IcConfigEntityComponentBase implements OnInit {

  entities$: Observable<EntityModel[]>;

  constructor(protected icConfigStore: IcConfigStore,
              protected entityIcConfigStore: T) {
    super();
  }

  ngOnInit() {
    this.icConfigStore.init();
    this.entities$ = this.entityIcConfigStore.state$
      .pipe(
        map(EntityModel.arrayFromMap)
      );
  }
}
