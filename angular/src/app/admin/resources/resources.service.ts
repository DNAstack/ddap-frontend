import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';
import { ConfigModel } from '../shared/config.model';
import { ConfigModificationObject } from '../shared/configModificationObject';
import { EntityModel } from '../shared/entity.model';
import { EntityService } from '../shared/entity.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root',
})
export class ResourceService implements EntityService {

  private realm: string;

  constructor(private http: HttpClient,
              private realmService: RealmService) {
    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }

  getAccessRequestToken(resourceId, viewId): Observable<any[]> {
    const params = {
    };

    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/resources/${resourceId}/views/${viewId}`, { params })
      .pipe(
        pluck('token')
      );
  }

  get(): Observable<Map<string, EntityModel>> {
    return this.http.get<ConfigModel>(`${environment.damApiUrl}/${this.realm}/config`)
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
    return this.http.post(`${environment.damApiUrl}/${this.realm}/config/resources/${id}`,
      change,
      { headers }
    );
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    const params = {
    };

    return this.http.put(`${environment.damApiUrl}/${this.realm}/config/resources/${id}`,
      change,
      { params, headers }
    );
  }

  remove(id: string): Observable<any> {
    throw new Error('Not yet implemented.');
  }

}
