import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

const headers = HTTP_HEADERS;

export abstract class AbstractConfigOptionService {

  protected constructor(protected http: HttpClient,
              protected targetApi: string,
              private errorHandler: ErrorHandlerService) {

  }

  get(params = {}): Observable<any[]> {
    return this.http.get<any>(`${this.targetApi}/${realmIdPlaceholder}/config`,
      {params})
      .pipe(
        this.errorHandler.handleError(),
        pluck('options')
      );
  }

  update(newOptions: object): Observable<any> {
    return this.http.put(`${this.targetApi}/${realmIdPlaceholder}/config/options`,
      {item: newOptions},
      {headers}
    ).pipe(
      this.errorHandler.handleError()
    );
  }

}
