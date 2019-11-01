import { Store } from 'ddap-common-lib';
import { EntityModel } from 'ddap-common-lib';
import { map, pluck } from 'rxjs/operators';

import { IcConfigEntityType } from './ic-config-entity-type.enum';
import { IcConfigStore } from './ic-config.store';

export class IcConfigEntityStore extends Store<Map<string, EntityModel>> {

  constructor(protected entityType: IcConfigEntityType,
              protected icConfigStore: IcConfigStore) {
    super(new Map<string, EntityModel>());
    this.init();
  }

  private init(): void {
    this.icConfigStore.state$
      .pipe(
        pluck(this.entityType),
        map(EntityModel.objectToMap)
      )
      .subscribe((entities: Map<string, EntityModel>) => {
        this.setState(entities);
      });
  }

}
