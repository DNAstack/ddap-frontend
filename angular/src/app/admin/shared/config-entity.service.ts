import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';

import { ConfigModel } from './config.model';
import { ConfigModificationObject } from './configModificationObject';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

export class ConfigEntityService implements EntityService {

  private realm: string;

  constructor(protected http: HttpClient,
              protected realmService: RealmService,
              protected typeNameInConfig: string,
              protected typeNameInUrl: string) {
    realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }

  get(params?): Observable<Map<string, EntityModel>> {
    params = params || {};

    return this.http.get<ConfigModel>(`${environment.damApiUrl}/${this.realm}/config`, { params })
      .pipe(
        pluck(this.typeNameInConfig),
        map(EntityModel.objectToMap)
      );
  }

  save(id: string, change: ConfigModificationObject): Observable<any> {
    const params = {
    };

    return this.http.post(`${environment.damApiUrl}/${this.realm}/config/${this.typeNameInUrl}/${id}`,
      change,
      { params, headers }
    );
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    const params = {
    };

    return this.http.put(`${environment.damApiUrl}/${this.realm}/config/${this.typeNameInUrl}/${id}`,
      change,
      { params, headers }
    );
  }

  remove(id: string): Observable<any> {
    const params = {
    };

    return this.http.delete(`${environment.damApiUrl}/${this.realm}/config/${this.typeNameInUrl}/${id}`,
      { params, headers }
    );
  }

}
