import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { EntityService } from './entity.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

export class ConfigEntityService implements EntityService {

  constructor(protected http: HttpClient, protected entityName: string) { }

  get(params?): Observable<any> {
    params = params || {};

    return this.http.get<any[]>(`${environment.damApiUrl}/config`, { params })
      .pipe(
        pluck(this.entityName)
      );
  }

  save(dto: any): Observable<any> {
    const params = {
    };
    const id = dto.name;

    return this.http.get<any[]>(`${environment.damApiUrl}/config`, { params })
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

    return this.http.get<any[]>(`${environment.damApiUrl}/config`, { params })
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

    return this.http.put(`${environment.damApiUrl}/config`,
      { item: config },
      { params, headers }
    );
  }

}
