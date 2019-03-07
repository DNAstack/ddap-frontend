import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';

import { ChangeModel } from './change.model';
import { ConfigModel } from './config.model';
import { EntityModel } from './entity.model';
import { EntityService } from './entity.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

export class ConfigEntityService implements EntityService {

  private realm: string;

  constructor(protected http: HttpClient,
              protected realmService: RealmService,
              protected entityName: string) {
    realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }

  get(params?): Observable<Map<string, EntityModel>> {
    params = params || {};

    return this.http.get<ConfigModel>(`${environment.damApiUrl}/${this.realm}/config`, { params })
      .pipe(
        pluck(this.entityName),
        map(EntityModel.objectToMap)
      );
  }

  save(change: ChangeModel): Observable<any> {
    const params = {
    };
    const id = change.entity.name;

    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/config`, { params })
      .pipe(
        mergeMap((config: any) => {
          config[this.entityName][id] = change.entity.dto;
          return this.updateConfig(config);
        })
      );
  }

  update(change: ChangeModel): Observable<any> {
      return this.save(change);
  }

  remove(id: string): Observable<any> {
    const params = {
    };

    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/config`, { params })
      .pipe(
        mergeMap((config: any) => {
          delete config[this.entityName][id];
          return this.updateConfig(config);
        })
      );
  }

  private updateConfig(config: object): Observable<any> {
    const params = {
    };

    return this.http.put(`${environment.damApiUrl}/${this.realm}/config`,
      { item: config },
      { params, headers }
    );
  }

}
