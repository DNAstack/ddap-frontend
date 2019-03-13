import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';
import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';

import { ConfigModel } from './config.model';
import { ConfigModificationObject } from './configModificationObject';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

const headers = HTTP_HEADERS;

export class ConfigEntityService implements EntityService {

  constructor(protected http: HttpClient,
              protected realmService: RealmService,
              protected typeNameInConfig: string,
              protected typeNameInUrl: string) {

  }

  get(params = {}): Observable<Map<string, EntityModel>> {
    return this.realmService.switchMap(realm => {
      return this.http.get<ConfigModel>(`${environment.damApiUrl}/${realm}/config`, {params});
    })
      .pipe(
        pluck(this.typeNameInConfig),
        map(EntityModel.objectToMap)
      );
  }

  save(id: string, change: ConfigModificationObject): Observable<any> {
    return this.realmService.switchMap(realm => {
      return this.http.post(`${environment.damApiUrl}/${realm}/config/${this.typeNameInUrl}/${id}`,
        change,
        { headers });
    });
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    return this.realmService.switchMap(realm => {
      return this.http.put(`${environment.damApiUrl}/${realm}/config/${this.typeNameInUrl}/${id}`,
        change,
        {headers}
      );
    });
  }

  remove(id: string): Observable<any> {
    return this.realmService.switchMap(realm => {
      return this.http.delete(`${environment.damApiUrl}/${realm}/config/${this.typeNameInUrl}/${id}`,
        { headers }
      );
    });
  }
}
