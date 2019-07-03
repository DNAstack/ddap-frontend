import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { HTTP_HEADERS } from '../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

const headers = HTTP_HEADERS;

export abstract class AbstractConfigOptionService {

  protected constructor(protected http: HttpClient,
                        private errorHandler: ErrorHandlerService) {

  }

  protected _get(targetApi: string, params = {}): Observable<any[]> {
    return this.http.get<any>(`${targetApi}/${realmIdPlaceholder}/config`,
      {params})
      .pipe(
        this.errorHandler.notifyOnError(`Can't load settings.`),
        pluck('options')
      );
  }

  protected _update(targetApi: string, newOptions: object): Observable<any> {
    return this.http.put(`${targetApi}/${realmIdPlaceholder}/config/options`,
      {item: newOptions},
      {headers}
    ).pipe(
      this.errorHandler.notifyOnError(`Can't update settings.`)
    );
  }

}
