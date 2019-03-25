import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

const headers = HTTP_HEADERS;

export abstract class AbstractConfigOptionService {

  constructor(protected http: HttpClient,
              protected targetApi: string) {

  }

  get(params = {}): Observable<any[]> {
    return this.http.get<any>(`${this.targetApi}/${realmIdPlaceholder}/config`,
      {params})
      .pipe(
        pluck('options')
      );
  }

  update(newOptions: object): Observable<any> {
    return this.http.put(`${this.targetApi}/${realmIdPlaceholder}/config/options`,
      {item: newOptions},
      {headers}
    );
  }

}
