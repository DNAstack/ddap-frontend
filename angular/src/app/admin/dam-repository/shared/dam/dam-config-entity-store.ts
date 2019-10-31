import { Store } from 'ddap-common-lib';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { DamInfoService } from '../../../../shared/dam/dam-info.service';
import { EntityModel } from '../../../shared/entity.model';

import { DamConfigEntityType } from './dam-config-entity-type.enum';
import { DamConfigEntity } from './dam-config-entity.model';
import { DamConfigStore } from './dam-config.store';

export class DamConfigEntityStore extends Store<DamConfigEntity> {

  constructor(protected entityType: DamConfigEntityType,
              protected damConfigStore: DamConfigStore,
              protected damInfoService: DamInfoService) {
    super({});
    this.damInfoService.getDamInfos()
      .subscribe((damInfos) => {
        damInfos.forEach((damInfo) => {
          this.init(damInfo.id);
        });
      });
  }

  public getAsList(damId: string, innerMapFn?): Observable<any[]> {
    return this.state$
      .pipe(
        pluck(damId),
        map((values) => {
          if (!values) {
            return [];
          }
          return values;
        }),
        map(EntityModel.arrayFromMap),
        map(issuerList => innerMapFn ? issuerList.map(innerMapFn) : issuerList)
      );
  }

  private init(damId: string): void {
    this.damConfigStore.state$
      .pipe(
        pluck(damId, this.entityType),
        map(EntityModel.objectToMap)
      )
      .subscribe((entities: Map<string, EntityModel>) => {
        this.setState({ ...this.state, [damId]: entities });
      });
  }

}
