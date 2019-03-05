import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';

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

  get(params?): Observable<any> {
    params = params || {};

    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/config`, { params })
      .pipe(
        pluck(this.entityName)
      );
  }

  save(dto: any): Observable<any> {
    const params = {
    };
    const id = dto.name;

    return this.http.get<any[]>(`${environment.damApiUrl}/${this.realm}/config`, { params })
      .pipe(
        mergeMap((config: any) => {
          config[this.entityName][id] = dto;
          return this.updateConfig(config);
        })
      );
  }

  update(dto: any): Observable<any> {
      return this.save(dto);
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
