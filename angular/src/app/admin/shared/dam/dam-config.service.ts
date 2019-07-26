import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, map, pluck } from 'rxjs/operators';

import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { dam } from '../../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { ConfigModel } from '../config.model';
import { ConfigModificationObject } from '../configModificationObject';
import { EntityModel } from '../entity.model';

import { DamConfigEntityType } from './dam-config-entity-type.enum';

import DamConfig = dam.v1.DamConfig;

export class DamConfigService {

  constructor(protected entityType: DamConfigEntityType,
              protected http: HttpClient,
              protected damInfoService: DamInfoService) {
  }

  get(damId: string, params = {}): Observable<DamConfig> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.get<ConfigModel>(`${damApiUrl}/${realmIdPlaceholder}/config`, { params })
            .pipe(
              map(DamConfig.create)
            );
        })
      );
  }

  getList(damId: string, innerMapFn?): Observable<EntityModel[]> {
    return this.get(damId).pipe(
      pluck(damId, this.entityType),
      map(EntityModel.objectToMap),
      map(EntityModel.arrayFromMap),
      map(issuerList => innerMapFn ? issuerList.map(innerMapFn) : issuerList)
    );
  }

  save(damId: string, entityId: string, change: ConfigModificationObject): Observable<any> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.post(`${damApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${entityId}`,
            change
          );
        })
      );
  }

  update(damId: string, entityId: string, change: ConfigModificationObject): Observable<any> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.put(`${damApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${entityId}`,
            change
          );
        })
      );
  }

  remove(damId: string, entityId: string, change: ConfigModificationObject = null): Observable<any> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.request('delete', `${damApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${entityId}`,
            {
              body: change,
            }
          );
        })
      );
  }

}
