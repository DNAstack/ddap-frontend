import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';
import { RealmService } from '../../shared/realm/realm.service';

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
    return this.http.get<ConfigModel>(`${environment.damApiUrl}/$REALM/config`, {params})
      .pipe(
        pluck(this.typeNameInConfig),
        map(EntityModel.objectToMap)
      );
  }

  save(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.post(`${environment.damApiUrl}/$REALM/config/${this.typeNameInUrl}/${id}`,
      change,
      {headers});
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.put(`${environment.damApiUrl}/$REALM/config/${this.typeNameInUrl}/${id}`,
      change,
      {headers}
    );
  }

  remove(id: string): Observable<any> {

    return this.http.delete(`${environment.damApiUrl}/$REALM/config/${this.typeNameInUrl}/${id}`,
      {headers}
    );

  }
}
