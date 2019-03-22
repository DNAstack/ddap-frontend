import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigModel } from '../shared/config.model';
import { ConfigModificationObject } from '../shared/configModificationObject';
import { EntityModel } from '../shared/entity.model';
import { EntityService } from '../shared/entity.service';

const headers = HTTP_HEADERS;

@Injectable({
  providedIn: 'root',
})
export class ResourceService implements EntityService {

  constructor(private http: HttpClient) {

  }

  getAccessRequestToken(resourceId, viewId): Observable<any[]> {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}`;
    return this.http.get<any[]>(viewUrl)
      .pipe(
        pluck('token')
      );
  }

  get(): Observable<Map<string, EntityModel>> {
    return this.http.get<ConfigModel>(`${environment.damApiUrl}/${realmIdPlaceholder}/config`)
      .pipe(
        map(config => config.resources),
        map(EntityModel.objectToMap)
      );
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get().pipe(
      map(resources => resources.get(resourceName))
    );
  }

  save(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.post(`${environment.damApiUrl}/${realmIdPlaceholder}/config/resources/${id}`,
      change,
      {headers}
    );
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.put(`${environment.damApiUrl}/${realmIdPlaceholder}/config/resources/${id}`,
      change,
      {headers}
    );
  }

  remove(id: string): Observable<any> {
    throw new Error('Not yet implemented.');
  }
}
