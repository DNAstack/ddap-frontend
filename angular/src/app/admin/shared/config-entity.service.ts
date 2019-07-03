import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

import { ConfigModel } from './config.model';
import { ConfigModificationObject } from './configModificationObject';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

const headers = HTTP_HEADERS;

export class ConfigEntityService {

   constructor(protected http: HttpClient,
               protected errorHandler: ErrorHandlerService,
               protected typeNameInConfig: string,
               protected typeNameInUrl: string) {
  }

  get(damId: string, params = {}): Observable<Map<string, EntityModel>> {
    const damApiUrl = environment.damApiUrls.get(damId);
    return this.http.get<ConfigModel>(`${damApiUrl}/${realmIdPlaceholder}/config`, {params})
      .pipe(
        pluck(this.typeNameInConfig),
        map(EntityModel.objectToMap)
      );
  }

  getList(damId: string, innerMapFn?): Observable<EntityModel[]> {
    return this.get(damId).pipe(
      map(EntityModel.arrayFromMap),
      map(issuerList => innerMapFn ? issuerList.map(innerMapFn) : issuerList)
    );
  }

  save(damId: string, entityId: string, change: ConfigModificationObject): Observable<any> {
    const damApiUrl = environment.damApiUrls.get(damId);
    return this.http.post(`${damApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${entityId}`,
      change,
      {headers}
    );
  }

  update(damId: string, entityId: string, change: ConfigModificationObject): Observable<any> {
    const damApiUrl = environment.damApiUrls.get(damId);
    return this.http.put(`${damApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${entityId}`,
      change,
      {headers}
    );
  }

  remove(damId: string, entityId: string): Observable<any> {
    const damApiUrl = environment.damApiUrls.get(damId);
    return this.http.delete(`${damApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${entityId}`,
      {headers}
    ).pipe(
      this.errorHandler.notifyOnError(`Can't remove ${entityId}.`)
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
