import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { flatMap, map } from 'rxjs/operators';

import { DamInfoService } from '../../../../shared/dam/dam-info.service';
import { dam } from '../../../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../../../shared/realm/realm.constant';
import { ConfigModificationObject } from '../../../shared/configModificationObject';

import { DamConfigEntityType } from './dam-config-entity-type.enum';

import DamConfig = dam.v1.DamConfig;

export abstract class DamConfigService {

  protected constructor(protected entityType: DamConfigEntityType,
                        protected http: HttpClient,
                        protected damInfoService: DamInfoService) {
  }

  get(damId: string, params = {}): Observable<DamConfig> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.get<DamConfig>(`${damApiUrl}/${realmIdPlaceholder}/config`, { params })
            .pipe(
              map(DamConfig.create)
            );
        })
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