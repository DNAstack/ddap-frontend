import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { flatMap, map, pluck } from 'rxjs/operators';

import { DamInfoService } from '../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

import { ConfigModel } from './config.model';
import { ConfigModificationObject } from './configModificationObject';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

export class ConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService,
              protected damInfoService: DamInfoService,
              protected typeNameInConfig: string,
              protected typeNameInUrl: string) {
  }

  get(damId: string, params = {}): Observable<Map<string, EntityModel>> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.get<ConfigModel>(`${damApiUrl}/${realmIdPlaceholder}/config`, {params})
            .pipe(
              pluck(this.typeNameInConfig),
              map(EntityModel.objectToMap)
            );
        })
      );
  }

  getList(damId: string, innerMapFn?): Observable<EntityModel[]> {
    return this.get(damId).pipe(
      map(EntityModel.arrayFromMap),
      map(issuerList => innerMapFn ? issuerList.map(innerMapFn) : issuerList)
    );
  }

  save(damId: string, entityId: string, change: ConfigModificationObject): Observable<any> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.post(`${damApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${entityId}`,
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
          return this.http.put(`${damApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${entityId}`,
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
          return this.http.request('delete', `${damApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${entityId}`,
            {
              body: change,
            }
          ).pipe(
            this.errorHandler.notifyOnError(`Can't remove ${entityId}.`)
          );
        })
      );
  }

  asEntityService(damId: string): EntityService {
     const rawService = this;
     return new class implements EntityService {
       get(): Observable<Map<string, EntityModel>> {
         return rawService.get(damId);
       }

       remove(entityId: string): Observable<any> {
         return rawService.remove(damId, entityId);
       }

       save(entityId: string, change: ConfigModificationObject): Observable<any> {
         return rawService.save(damId, entityId, change);
       }

       update(entityId: string, change: ConfigModificationObject): Observable<any> {
         return rawService.update(damId, entityId, change);
       }
     };

  }
}
