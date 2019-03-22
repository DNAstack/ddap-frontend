import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { HTTP_HEADERS } from '../../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';

const headers = HTTP_HEADERS;

@Injectable({
  providedIn: 'root',
})
export class OptionService {

  constructor(private http: HttpClient) {

  }

  get(params = {}): Observable<any[]> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/config`,
      {params})
      .pipe(
        pluck('options')
      );
  }

  update(newOptions: object): Observable<any> {
    return this.http.put(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/options`,
      {item: newOptions},
      {headers}
    );
  }
}
