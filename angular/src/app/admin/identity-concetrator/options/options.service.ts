import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { RealmService } from '../../../realm.service';
import { HTTP_HEADERS } from '../../../shared/HTTP_HEADERS';

const headers = HTTP_HEADERS;

@Injectable({
  providedIn: 'root',
})
export class OptionService {

  constructor(private http: HttpClient,
              private realmService: RealmService) {

  }

  get(params = {}): Observable<any[]> {
    return this.realmService.switchMap(realm => {
      return this.http.get<any>(`${environment.idpApiUrl}/${realm}/config`,
        { params });
    }).pipe(
      pluck('options')
    );
  }

  update(newOptions: object): Observable<any> {
    return this.realmService.switchMap(realm => {
      return this.http.put(`${environment.idpApiUrl}/${realm}/config/options`,
        { item: newOptions },
        { headers }
      );
    });
  }
}
